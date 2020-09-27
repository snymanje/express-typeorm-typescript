import { User } from '../../entity/User';
import { getRepository, MoreThan } from 'typeorm';
import crypto from 'crypto';
import AppError from '../../utils/appError';
import { IUser } from '../../interfaces/user.interfaces';
import ResetPasswordDto from '../../dtos/ResetPasswordDto';

export default async (requestBody: ResetPasswordDto, resetToken: string): Promise<IUser> => {
  const { password, passwordConfirm } = requestBody;

  if (password != passwordConfirm) throw new AppError('Password and Confirm Password do not match.', 400);

  const hashedToken = await crypto.createHash('sha256').update(resetToken).digest('hex');

  const userRepository = await getRepository(User);
  const user = await userRepository.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: MoreThan(Date.now())
  });

  if (!user) {
    throw new AppError('The user for this token does not exist or this token has expired', 400);
  }

  user.password = password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;

  await user.hashLocalPassword();
  await user.setPasswordChangedAt();

  await userRepository.save(user);

  return user.toClientUserData();
};
