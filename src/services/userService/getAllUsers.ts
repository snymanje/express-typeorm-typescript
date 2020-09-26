import { User } from '../../entity/User';
import { getRepository } from 'typeorm';
import AppError from '../../utils/appError';
import { IUser } from '../../interfaces/user.interfaces';

export default async (): Promise<IUser[]> => {
  const userRepository = await getRepository(User);
  const users = await userRepository.find({});

  if (!users) throw new AppError('No users found...', 400);

  const allUsers = await Promise.all(
    users.map(async (user) => {
      return user.toClientUserData();
    })
  );

  return allUsers;
};
