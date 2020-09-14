import sendMail from '../../utils/sendEmail';
import config from '../../config/config';
import AppError from '../../utils/appError';
import { ISignUpUser } from '../../interfaces/user.interfaces';

export default async (user: ISignUpUser): Promise<void> => {
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

    throw new AppError('There was an error trying to send the email to activate account!', 500);
  }
};
