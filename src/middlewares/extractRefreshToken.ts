import { Request, Response, NextFunction } from 'express';
import AppError from '../utils/appError';

export const extractRefreshToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  let refreshtoken = <string>req.headers.refreshtoken;

  if (req.cookies.refreshTokenSignature && req.cookies.refreshTokenPayload) {
    refreshtoken = `${req.cookies.refreshTokenPayload}.${req.cookies.refreshTokenSignature}`;
  } else if (refreshtoken && refreshtoken.startsWith('Bearer')) {
    refreshtoken = refreshtoken.split(' ')[1];
  } else {
    next(new AppError('No refresh token found in header or cookies...', 401));
  }

  res.locals.refreshToken = refreshtoken;
  next();
};
