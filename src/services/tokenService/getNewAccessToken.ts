import { promisify } from 'util';
import { getRepository } from 'typeorm';
import { User } from '../../entity/User';
import jwt from 'jsonwebtoken';
import config from '../../config/config';
import AppError from '../../utils/appError';

export default async (refreshToken: string): Promise<string> => {
  // verify the token
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const decoded: any = await promisify(jwt.verify)(refreshToken, config.refreshTokenSecret);

  // Check if user exists
  const userRepository = getRepository(User);
  const loggedInUser = await userRepository.findOne({ where: { id: decoded.id } });
  if (!loggedInUser) {
    throw new AppError('User for this token nolonger exists, please register', 401);
  }
  // Only do this check if your is signup with local username and password
  // Check if the user changed his password.
  if (loggedInUser.authMethod === 'local') {
    if (loggedInUser.changedPasswordAfter(decoded.iat)) {
      throw new AppError('Password has changed, please log in again', 401);
    }
  }

  const { id } = loggedInUser;
  const access_token = await jwt.sign({ id }, config.tokenSecret, {
    expiresIn: process.env.TOKENEXPIRES
  });

  return access_token;
};
