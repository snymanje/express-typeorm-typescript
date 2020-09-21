import localSignup from './localSignup';
import localLogin from './localLogin';
import activateAccount from './activateAccount';
import generateTokens from './generateTokens';
import setAuthCookies from './setAuthCookies';

const authService = {
  localSignup,
  localLogin,
  activateAccount,
  generateTokens,
  setAuthCookies
};

export default authService;
