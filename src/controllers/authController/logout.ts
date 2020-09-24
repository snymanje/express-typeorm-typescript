import { Response, Request } from 'express';

export default async (req: Request, res: Response): Promise<void> => {
  res.cookie('token', false, {
    httpOnly: true,
    maxAge: 0
  });
  res.cookie('refreshTokenSignature', false, {
    httpOnly: true,
    maxAge: 0
  });
  res.cookie('refreshTokenPayload', false, {
    maxAge: 0
  });
  res.status(200).json({
    status: 'Successfull',
    message: 'User logged out successfully.',
    data: {
      access_token: null,
      refresh_token: null
    }
  });
};
