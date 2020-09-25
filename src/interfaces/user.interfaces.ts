export interface IUser {
  id: number;
  authMethod: string;
  role: string;
  name: string;
  email: string;
}

export interface ISignUpUser {
  name: string;
  email: string;
  role: string;
  activationToken: string;
}

export interface IToken {
  access_token: string;
  refresh_token: string;
}

export interface IUserWithPwdResetToken {
  id: number;
  authMethod: string;
  role: string;
  name: string;
  email: string;
  resetToken: string;
}
