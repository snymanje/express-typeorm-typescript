import sendActivationToken from '../emailService/sendActivationToken';
import sendForgotPwdEmail from './sendForgotPwdEmail';

const emailService = {
  sendActivationToken,
  sendForgotPwdEmail
};

export default emailService;
