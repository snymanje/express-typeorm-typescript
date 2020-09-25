import { User } from '../../entity/User';
import { getRepository } from 'typeorm';
import AppError from '../../utils/appError';
import CreateGoogleUser from '../../dtos/CreateGoogleUser';
import { IUser } from '../../interfaces/user.interfaces';
import authService from '../authService';

export default async (requestBody: CreateGoogleUser): Promise<IUser> => {
  const { access_token } = requestBody;

  if (!access_token) throw new AppError('The google access token was not provided.', 400);

  const { sub } = await authService.getGoogleUser(access_token);

  // check if the current user exists in the DB
  const userRepository = await getRepository(User);
  const existingUser = await userRepository.findOne({ googleId: sub });

  if (!existingUser) {
    throw new AppError('You have not registerd yet, please go to signup.', 401);
  }

  if (existingUser && !existingUser.active)
    throw new AppError('You already have an account that is not activated yet', 403);

  return existingUser.toClientUserData();
};
