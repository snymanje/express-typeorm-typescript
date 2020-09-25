import { IUserWithPwdResetToken } from './../../interfaces/user.interfaces';
import sendMail from './sendEmail';
import config from '../../config/config';
import AppError from '../../utils/appError';

export default async (user: IUserWithPwdResetToken, protocol: string): Promise<void> => {
  const resetUrl = `${protocol}://${config.clientUrl}/resetPassword/${user.resetToken}`;

  const message = `<p>
        Forgot your password? Token
        <a
          href="${resetUrl}"
          target="_blank"
        >Reset Password</a>
      </p>`;

  try {
    await sendMail({
      email: user.email,
      subject: 'Reset password',
      message
    });

    return;
  } catch (error) {
    // user.passwordResetToken = undefined;
    //  user.passwordResetExpires = undefined;

    throw new AppError('There was an error trying to send the email for password reset!', 500);
  }
};
