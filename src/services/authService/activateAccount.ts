import AppError from '../../utils/appError';
import crypto from 'crypto';
import { User } from '../../entity/User';
import { getRepository, MoreThan } from 'typeorm';
import UserToClientDto from '../../dtos/userToClient';

export default async (activationToken: string): Promise<UserToClientDto> => {
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

  user.active = true;
  user.accountActivationExpires = new Date(Date.now());
  user.accountActivationToken = null;
  await userRepository.save(user);

  return user.toClientUserData();
};
