import { User } from '../../entity/User';
import { getRepository } from 'typeorm';
import EditUserDto from '../../dtos/EditUserDto';
import { IUser } from '../../interfaces/user.interfaces';
import AppError from '../../utils/appError';

export default async (requestBody: EditUserDto): Promise<IUser> => {
  //Get parameters from the body
  const { email, name, role } = requestBody;

  //Try to save. If fails, the username is already in use
  const userRepository = getRepository(User);
  const user = await userRepository.findOne({ email });

  if (!user) throw new AppError(`Can not find user... ${email}`, 400);

  user.name = name;
  user.role = role;

  await userRepository.save(user);

  return user.toClientUserData();
};
