import localSignup from '../authService/localSignup';
import localLogin from '../authService/localLogin';
import activateAccount from '../authService/activateAccount';
import generateTokens from '../authService/generateTokens';
import setAuthCookies from '../authService/setAuthCookies';

const authService = {
  localSignup,
  localLogin,
  activateAccount,
  generateTokens,
  setAuthCookies
};

export default authService;
