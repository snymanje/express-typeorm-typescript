import getAllUsers from '../userService/getAllUsers';
import sendActivationToken from '../userService/sendActivationToken';

const userService = {
  getAllUsers,
  sendActivationToken
};

export default userService;
