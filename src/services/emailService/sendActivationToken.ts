import { IUserWithActivationToken } from './../../interfaces/user.interfaces';
import sendMail from './sendEmail';
import config from '../../config/config';
import AppError from '../../utils/appError';

export default async (user: IUserWithActivationToken): Promise<void> => {
  const activateAccountUrl = `http://${config.clientUrl}/activateAccount/${user.activationToken}`;

  const message = `<p>
      Thanks for registering, please activate your account to get started. Token
      <a
        href="${activateAccountUrl}"
        target="_blank"
      >Reset Password</a>
    </p>`;

  try {
    await sendMail({
      email: user.email,
      subject: 'Activate Account',
      message
    });
    return;
  } catch (err) {
    /*         user.passwordResetToken = undefined;
                  user.passwordResetExpires = undefined; */
    console.log(err);
    throw new AppError('There was an error trying to send the email to activate account!', 500);
  }
};
