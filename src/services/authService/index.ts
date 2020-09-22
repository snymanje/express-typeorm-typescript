import localSignup from './localSignup';
import googleSignup from './googleSignup';
import localLogin from './localLogin';
import googleLogin from './googleLogin';
import activateAccount from './activateAccount';
import generateTokens from './generateTokens';
import setAuthCookies from './setAuthCookies';
import getGoogleUser from './getGoogleUser';

const authService = {
  localSignup,
  googleSignup,
  localLogin,
  googleLogin,
  activateAccount,
  generateTokens,
  setAuthCookies,
  getGoogleUser
};

export default authService;
