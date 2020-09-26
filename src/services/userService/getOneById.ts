import { User } from '../../entity/User';
import { getRepository } from 'typeorm';
import { IUser } from '../../interfaces/user.interfaces';
import AppError from '../../utils/appError';

export default async (userId: number): Promise<IUser> => {
  const userRepository = getRepository(User);
  const user = await userRepository.findOne(userId);
  if (!user) throw new AppError('User with this id could not be found', 400);

  return user.toClientUserData();
};
