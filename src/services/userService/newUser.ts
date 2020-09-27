import { User } from '../../entity/User';
import { getRepository } from 'typeorm';
import AppError from '../../utils/appError';
import CreateLocalUserWithRoleDto from '../../dtos/CreateLocalUserWithRoleDto';
import { IUser } from '../../interfaces/user.interfaces';

export default async (requestBody: CreateLocalUserWithRoleDto): Promise<IUser> => {
  //Get parameters from the body
  const { name, email, password, passwordConfirm, role } = requestBody;

  if (password != passwordConfirm) throw new AppError('Password and Confirm Password do not match.', 400);

  const user = new User();
  user.name = name;
  user.password = password;
  user.email = email;
  user.role = role;

  //Try to save. If fails, the username is already in use
  const userRepository = getRepository(User);
  await userRepository.save(user);

  return user.toClientUserData();
};
