import { User } from '../../entity/User';
import { getRepository } from 'typeorm';
import AppError from '../../utils/appError';
import { ISignUpUser } from '../../interfaces/user.interfaces';
import CreateUserDto from '../../dtos/createUser';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default async (payload: CreateUserDto): Promise<ISignUpUser> => {
  if (payload.password != payload.passwordConfirm)
    throw new AppError('Password and Confirm Password do not match.', 400);
  const user = new User();
  user.name = payload.name;
  user.password = payload.password;
  user.passwordConfirm = payload.passwordConfirm;
  user.email = payload.email;
  user.role = payload.role;

  //Hash the password, to securely store on DB
  await user.hashLocalPassword();

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
