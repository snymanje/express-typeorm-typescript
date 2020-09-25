import { User } from '../../entity/User';
import { getRepository } from 'typeorm';
import AppError from '../../utils/appError';
import Email from '../../dtos/Email';
import { IUserWithPwdResetToken } from '../../interfaces/user.interfaces';

export default async (requestBody: Email): Promise<IUserWithPwdResetToken> => {
  const { email } = requestBody;
  // check if the current user exists in the DB
  const userRepository = await getRepository(User);
  const user = await userRepository.findOne({ email });

  if (!user) {
    throw new AppError('A user with this email address does not exist', 401);
  }

  const resetToken = await user.createPasswordResettoken();
  await userRepository.save(user);

  const clientData = await user.toClientUserData();
  return { ...clientData, resetToken };
};
