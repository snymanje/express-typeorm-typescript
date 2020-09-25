import UserToClient from '../../dtos/UserToClient';
import { IToken } from '../../interfaces/user.interfaces';
import jwt from 'jsonwebtoken';
import config from '../../config/config';

export default async (user: UserToClient): Promise<IToken> => {
  const { id } = user;
  const access_token = await jwt.sign({ id }, config.tokenSecret, {
    expiresIn: config.tokenExpiresIn
  });

  const refresh_token = await jwt.sign({ id }, config.refreshTokenSecret, {
    expiresIn: config.refreshTokenExpiresIn
  });

  return {
    access_token,
    refresh_token
  };
};
