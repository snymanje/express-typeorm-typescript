import { ITokens, IUser } from '../../interfaces/user.interfaces';
import jwt from 'jsonwebtoken';
import config from '../../config/config';

export default async (user: IUser): Promise<ITokens> => {
  const { id, email, role, authMethod } = user;
  const access_token = await jwt.sign({ id, email, role, authMethod }, config.tokenSecret, {
    expiresIn: config.tokenExpiresIn
  });

  const refresh_token = await jwt.sign({ id, email, role, authMethod }, config.refreshTokenSecret, {
    expiresIn: config.refreshTokenExpiresIn
  });

  return {
    access_token,
    refresh_token
  };
};
