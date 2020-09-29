import AppError from '../../utils/appError';
import crypto from 'crypto';
import { User } from '../../entity/User';
import { getRepository, MoreThan } from 'typeorm';
import { IUser } from '../../interfaces/user.interfaces';

export default async (activationToken: string): Promise<IUser> => {
  if (!activationToken) throw new AppError('No Activation token found', 400);

  const hashedToken = crypto.createHash('sha256').update(activationToken).digest('hex');

  const userRepository = await getRepository(User);
  const user = await userRepository.findOne({
    accountActivationToken: hashedToken,
    accountActivationExpires: MoreThan(Date.now())
  });

  if (!user) {
    throw new AppError('The user for this token does not exist or this token has expired', 400);
  }

  if (user.active) {
    throw new AppError('This account is already active', 400);
  }

  await user.activateAccount();
  await userRepository.save(user);

  return user.toClientUserData();
};
