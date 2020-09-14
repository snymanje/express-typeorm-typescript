import { User } from '../../entity/User';
import { getRepository } from 'typeorm';
import AppError from '../../utils/appError';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default async (): Promise<User[]> => {
  const userRepository = await getRepository(User);
  const users = await userRepository.find({});

  if (!users) throw new AppError('No users found...', 400);

  const allUsers = users.map((user) => {
    return user; // userBasicInfo(user);
  });

  return allUsers;
};
