import { IToken } from '../../interfaces/user.interfaces';
import { Response } from 'express';
import config from '../../config/config';

export default async (res: Response, tokens: IToken): Promise<void> => {
  const refreshtokenArray = tokens.refresh_token.split('.');
  const [refreshTokenHeader, refreshTokenPayload, refreshTokenSignature] = refreshtokenArray;

  res.cookie('token', tokens.access_token, {
    httpOnly: true
    //maxAge: process.env.COOKIEEXPIRES,
  });
  res.cookie('refreshTokenSignature', refreshTokenSignature, {
    httpOnly: true
    //maxAge: process.env.REFRESHCOOKIEEXPIRES,
  });
  res.cookie('refreshTokenPayload', `${refreshTokenHeader}.${refreshTokenPayload}`, {
    maxAge: Number(config.cookieExpires)
  });
};
