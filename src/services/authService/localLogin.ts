import LoginUserDto from '../../dtos/loginUser';
import AppError from '../../utils/appError';
import { getRepository } from 'typeorm';
import { User } from '../../entity/User';
import UserToClientDto from '../../dtos/userToClient';

export default async (requestBody: LoginUserDto): Promise<UserToClientDto> => {
  //Check if username and password are set
  const { email, password } = requestBody;
  if (!(email && password)) {
    throw new AppError('Email and Password must be present', 400);
  }
  //Get user from database
  const userRepository = getRepository(User);
  const user = await userRepository.findOneOrFail({ where: { email } });
  //Check if encrypted password match
  if (!user || !user.checkIfUnencryptedPasswordIsValid(password)) {
    throw new AppError('Incorrect name or password.', 401);
  }

  return { ...user.toClientUserData() };
};
