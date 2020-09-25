import { User } from '../../entity/User';
import { getRepository } from 'typeorm';
import AppError from '../../utils/appError';
import { IUserWithActivationToken } from '../../interfaces/user.interfaces';
import CreateUser from '../../dtos/CreateLocalUser';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default async (requestBody: CreateUser): Promise<IUserWithActivationToken> => {
  if (requestBody.password != requestBody.passwordConfirm)
    throw new AppError('Password and Confirm Password do not match.', 400);
  const user = new User();
  user.authMethod = 'google';
  user.name = requestBody.name;
  user.password = requestBody.password;
  user.passwordConfirm = requestBody.passwordConfirm;
  user.email = requestBody.email;

  //Hash the password, to securely store on DB
  await user.hashLocalPassword();

  const activationToken = await user.createAccountActivationToken();
  const userRepository = await getRepository(User);
  const newUser = await userRepository.save(user);
  const clientData = await newUser.toClientUserData();
  return { ...clientData, activationToken };
};
