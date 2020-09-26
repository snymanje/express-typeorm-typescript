import { Response } from 'express';
import config from '../../config/config';
import { ITokens } from '../../interfaces/user.interfaces';

export default async (res: Response, tokens: ITokens): Promise<void> => {
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
