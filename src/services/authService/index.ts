import localSignup from '../authService/localSignup';
import activateAccount from '../authService/activateAccount';
import generateTokens from '../authService/generateTokens';
import setAuthCookies from '../authService/setAuthCookies';

const authService = {
  localSignup,
  activateAccount,
  generateTokens,
  setAuthCookies
};

export default authService;
