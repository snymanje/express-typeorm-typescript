import localSignup from './localSignup';
import googleSignup from './googleSignup';
import localLogin from './localLogin';
import googleLogin from './googleLogin';
import activateAccount from './activateAccount';
import getGoogleUser from './getGoogleUser';
import createPwdResetToken from './createPwdResetToken';

const authService = {
  localSignup,
  googleSignup,
  localLogin,
  googleLogin,
  activateAccount,
  getGoogleUser,
  createPwdResetToken
};

export default authService;
