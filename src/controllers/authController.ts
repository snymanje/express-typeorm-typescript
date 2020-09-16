import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import { validate } from 'class-validator';

import { User } from '../entity/User';
import config from '../config/config';
import AppError from '../utils/appError';
import authService from '../services/authService';
import emailService from '../services/emailService';

class AuthController {
  static localSignUp = async (req: Request, res: Response): Promise<void> => {
    const user = await authService.localSignup(req.body);
    await emailService.sendActivationToken(user);
    res.status(201).json({
      status: 'Successfull',
      message: 'User created',
      data: {
        username: user.name,
        email: user.email,
        role: user.role
      }
    });
  };
  static login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    //Check if username and password are set
    const { name, password } = req.body;
    if (!(name && password)) {
      return next(new AppError('Name and Password must be present', 400));
    }
    console.log(req.body);
    //Get user from database
    const userRepository = getRepository(User);
    const user = await userRepository.findOneOrFail({ where: { name } });
    //Check if encrypted password match
    if (!user || !user.checkIfUnencryptedPasswordIsValid(password)) {
      return next(new AppError('Incorrect name or password.', 401));
    }

    //JWT, valid for 1 hour
    const token = jwt.sign({ userId: user.id, username: user.name }, config.jwtSecret, { expiresIn: '1h' });
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
