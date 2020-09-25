import getNewAccessToken from '../tokenService/getNewAccessToken';
import generateLoginTokens from './generateLoginTokens';
import setAuthCookies from '../tokenService/setAuthCookies';

const tokenService = {
  getNewAccessToken,
  generateLoginTokens,
  setAuthCookies
};

export default tokenService;
