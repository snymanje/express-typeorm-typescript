import { User } from '../../entity/User';
import { getRepository } from 'typeorm';
import AppError from '../../utils/appError';
import { ISignUpUser } from '../../interfaces/user.interfaces';
import CreateUserDto from '../../dtos/createUser';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default async (payload: CreateUserDto): Promise<ISignUpUser> => {
  const user = new User();
  user.name = payload.name;
  user.password = payload.password;
  user.email = payload.email;
  user.role = payload.role;

  const activationToken = await user.createAccountActivationToken();
  const userRepository = await getRepository(User);
  try {
    const newUser = await userRepository.save(user);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { name, email, role } = newUser;
    return { name, email, role, activationToken };
  } catch (err) {
    throw new AppError(err.message, 400);
  }
};
