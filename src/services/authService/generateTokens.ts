import UserToClientDto from '../../dtos/userToClient';
import { IToken } from '../../interfaces/user.interfaces';
import jwt from 'jsonwebtoken';
import config from '../../config/config';

export default async (user: UserToClientDto): Promise<IToken> => {
  const { id } = user;
  const access_token = await jwt.sign({ id }, process.env.TOKENSECRET, {
    expiresIn: config.tokenExpiresIn
  });

  const refresh_token = await jwt.sign({ id }, process.env.REFRESHTOKENSECRET, {
    expiresIn: config.refreshTokenExpiresIn
  });

  return {
    access_token,
    refresh_token
  };
};