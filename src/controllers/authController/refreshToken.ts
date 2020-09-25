import { Request, Response } from 'express';
import tokenService from '../../services/tokenService';

export default async (req: Request, res: Response): Promise<void> => {
  const token = await tokenService.getNewAccessToken(res.locals.refreshToken);
  res.cookie('token', token, {
    httpOnly: true
  });
  res.status(200).json({
    status: 'Successfull',
    message: 'Reissued access token.',
    data: {
      access_token: token
    }
  });
};
