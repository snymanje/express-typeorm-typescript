import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import { validate } from 'class-validator';

import { User } from '../entity/User';
import config from '../config/config';
import AppError from '../utils/appError';

class AuthController {
  static login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    //Check if username and password are set
    const { username, password } = req.body;
    if (!(username && password)) {
      return next(new AppError('Username and Password must be present', 400));
    }

    //Get user from database
    const userRepository = getRepository(User);
    const user = await userRepository.findOneOrFail({ where: { username } });

    //Check if encrypted password match
    if (!user || !user.checkIfUnencryptedPasswordIsValid(password)) {
      return next(new AppError('Incorrect username or password.', 401));
    }

    //Sing JWT, valid for 1 hour
    const token = jwt.sign({ userId: user.id, username: user.username }, config.jwtSecret, { expiresIn: '1h' });

    //Send the jwt in the response
    res.send(token);
  };

  static changePassword = async (req: Request, res: Response): Promise<void> => {
    //Get ID from JWT
    const id = res.locals.jwtPayload.userId;

    //Get parameters from the body
    const { oldPassword, newPassword } = req.body;
    if (!(oldPassword && newPassword)) {
      res.status(400).send();
    }

    //Get user from the database
    const userRepository = getRepository(User);
    let user: User;
    try {
      user = await userRepository.findOneOrFail(id);
    } catch (id) {
      res.status(401).send();
    }

    //Check if old password matchs
    if (!user.checkIfUnencryptedPasswordIsValid(oldPassword)) {
      res.status(401).send();
      return;
    }

    //Validate de model (password lenght)
    user.password = newPassword;
    const errors = await validate(user);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }
    //Hash the new password and save
    user.hashPassword();
    userRepository.save(user);

    res.status(204).send();
  };
}
export default AuthController;
