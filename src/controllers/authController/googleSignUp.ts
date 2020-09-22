import { Request, Response } from 'express';
import authService from '../../services/authService';
import emailService from '../../services/emailService';

export default async (req: Request, res: Response): Promise<void> => {
  const user = await authService.googleSignup(req.body);
  await emailService.sendActivationToken(user);
  res.status(201).json({
    status: 'Successfull',
    message: `Activation email sent to ${user.email}`
  });
};
