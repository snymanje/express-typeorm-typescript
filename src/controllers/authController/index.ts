import localSignUp from './localSignUp';
import googleSignUp from './googleSignUp';
import localLogin from './localLogin';
import googleLogin from './googleLogin';
import activateAccount from './activateAccount';
import logout from './logout';
import refreshToken from './refreshToken';

const authController = {
  localSignUp,
  googleSignUp,
  localLogin,
  googleLogin,
  activateAccount,
  logout,
  refreshToken
};

export default authController;
