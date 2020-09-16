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
