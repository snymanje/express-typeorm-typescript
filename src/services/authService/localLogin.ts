import LoginUserDto from '../../dtos/LoginLocalUser';
import AppError from '../../utils/appError';
import { getRepository } from 'typeorm';
import { User } from '../../entity/User';
import UserToClient from '../../dtos/UserToClient';

export default async (requestBody: LoginUserDto): Promise<UserToClient> => {
  //Check if username and password are set
  const { email, password } = requestBody;
  if (!(email && password)) {
    throw new AppError('Email and Password must be present', 400);
  }

  //Get user from database
  const userRepository = getRepository(User);
  const user = await userRepository.findOne({ where: { email } });

  //Check if encrypted password match
  if (!user || !user.checkIfUnencryptedPasswordIsValid(password)) {
    throw new AppError('Incorrect name or password.', 401);
  }

  if (!user.isVerified())
    throw new AppError('You have not activated your account yet, or you have a pending password reset.', 403);

  return user.toClientUserData();
};
