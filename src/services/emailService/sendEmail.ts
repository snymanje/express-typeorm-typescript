import nodemailer from 'nodemailer';
import config from '../../config/config';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
interface MailOptions {
  email: string;
  subject: string;
  message: string;
}

const sendMail = async (option: MailOptions): Promise<void> => {
  const mailOptions = {
    from: config.emailFromAddress,
    to: option.email,
    subject: option.subject,
    html: option.message
  };

  const transporter = nodemailer.createTransport({
    host: config.emailHost,
    port: parseInt(config.emailPort),
    auth: {
      user: config.emailUser,
      pass: config.emailPassword
    }
  });

  await transporter.sendMail(mailOptions);
};

export = sendMail;
