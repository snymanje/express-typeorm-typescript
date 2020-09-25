import { User } from '../../entity/User';
import { getRepository } from 'typeorm';
import AppError from '../../utils/appError';
import { IUser } from '../../interfaces/user.interfaces';
import UpdatePassword from '../../dtos/updatePassword';

export default async (requestBody: UpdatePassword, id: number): Promise<IUser> => {
  const { password, passwordCurrent, passwordConfirm } = requestBody;

  if (password != passwordConfirm) throw new AppError('Password and Confirm Password do not match.', 400);

  const userRepository = await getRepository(User);
  const user = await userRepository.findOne({ id });

  if (!user || !(await user.checkIfUnencryptedPasswordIsValid(passwordCurrent))) {
    throw new AppError('Passwords are not correct', 403);
  }
  user.password = password;
  user.passwordConfirm = undefined;

  await user.hashLocalPassword();

  await userRepository.save(user);
  return user.toClientUserData();
};
