import { Request, Response } from 'express';
import authService from '../../services/authService';
import tokenService from '../../services/tokenService';

export default async (req: Request, res: Response): Promise<void> => {
  const user = await authService.updatePassword(req.body, res.locals.jwtPayload.id);
  const tokens = await tokenService.generateLoginTokens(user);
  await tokenService.setAuthCookies(res, tokens);
  res.status(200).json({
    status: 'Successfull',
    message: `Psssword for ${user.email} was successfully updated.`,
    data: { ...tokens }
  });
};
