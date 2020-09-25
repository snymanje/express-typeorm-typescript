import { Request, Response } from 'express';
import authService from '../../services/authService';
import tokenService from '../../services/tokenService';

export default async (req: Request, res: Response): Promise<void> => {
  const user = await authService.activateAccount(req.params.activationToken);
  const tokens = await tokenService.generateLoginTokens(user);
  await tokenService.setAuthCookies(res, tokens);
  res.status(200).json({
    status: 'Successfull',
    message: `Account activated successfully for ${user.email}`
  });
};
