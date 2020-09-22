import { Request, Response } from 'express';
import authService from '../../services/authService';

export default async (req: Request, res: Response): Promise<void> => {
  const user = await authService.googleLogin(req.body);
  const tokens = await authService.generateTokens(user);
  await authService.setAuthCookies(res, tokens);
  res.status(200).json({
    status: 'Successfull',
    message: `${user.email} logged in successfully.`,
    data: { ...tokens }
  });
};
