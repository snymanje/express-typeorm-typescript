import localSignUp from './localSignUp';
import googleSignUp from './googleSignUp';
import localLogin from './localLogin';
import googleLogin from './googleLogin';
import activateAccount from './activateAccount';

const authController = {
  localSignUp,
  googleSignUp,
  localLogin,
  googleLogin,
  activateAccount
};

export default authController;
