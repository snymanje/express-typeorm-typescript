import { Request } from 'express';

export interface IUser {
  id: number;
  authMethod: string;
  role: string;
  name: string;
  email: string;
}

export interface IUserWithActivationToken extends IUser {
  activationToken: string;
}

export interface IUserWithPwdResetToken extends IUser {
  resetToken: string;
}

export interface RequestWithUser extends Request {
  user: IUser;
}
