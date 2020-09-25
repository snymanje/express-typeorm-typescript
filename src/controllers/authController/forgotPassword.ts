import { Request, Response } from 'express';
import authService from '../../services/authService';
import emailService from '../../services/emailService';

export default async (req: Request, res: Response): Promise<void> => {
  const user = await authService.createPwdResetToken(req.body);
  await emailService.sendForgotPwdEmail(user, req.protocol);
  res.status(200).json({
    status: 'Successfull',
    message: 'Password Reset email sent!'
  });
};
