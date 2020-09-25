import { IUser } from '../../interfaces/user.interfaces';
import jwt from 'jsonwebtoken';
import config from '../../config/config';
import Tokens from '../../dtos/Tokens';

export default async (user: IUser): Promise<Tokens> => {
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
