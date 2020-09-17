import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { validate } from 'class-validator';

import { User } from '../entity/User';
import authService from '../services/authService';
import emailService from '../services/emailService';

class AuthController {
  static localSignUp = async (req: Request, res: Response): Promise<void> => {
    const user = await authService.localSignup(req.body);
    await emailService.sendActivationToken(user);
    res.status(201).json({
      status: 'Successfull',
      message: `Activation email sent to ${user.email}`
    });
  };
  static activateAccount = async (req: Request, res: Response): Promise<void> => {
    const user = await authService.activateAccount(req.params.activationToken);
    const tokens = await authService.generateTokens(user);
    await authService.setAuthCookies(res, tokens);
    res.status(200).json({
      status: 'Successfull',
      message: `Account activated successfully for ${user.email}`
    });
  };

  static localLogin = async (req: Request, res: Response): Promise<void> => {
    const user = await authService.localLogin(req.body);
    const tokens = await authService.generateTokens(user);
    await authService.setAuthCookies(res, tokens);
    res.status(200).json({
      status: 'Successfull',
      message: `Account activated successfully for ${user.email}`
    });
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
    user.hashLocalPassword();
    userRepository.save(user);

    res.status(204).send();
  };
}
export default AuthController;
