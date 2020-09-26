import getAllUsers from '../userService/getAllUsers';
import deleteUser from '../userService/deleteUser';
//import editUser from '../userService/editUser';
import getOneById from '../userService/getOneById';
import newUser from '../userService/newUser';

const userService = {
  getAllUsers,
  deleteUser,
  // editUser,
  getOneById,
  newUser
};

export default userService;
