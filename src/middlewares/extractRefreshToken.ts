import { Request, Response, NextFunction } from 'express';
import AppError from '../utils/appError';

export const extractRefreshToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  let refreshToken;
  const { authorization } = req.headers;

  if (authorization && authorization.startsWith('Bearer')) {
    refreshToken = authorization.split(' ')[1];
  } else if (req.cookies.refreshTokenSignature && req.cookies.refreshTokenPayload) {
    refreshToken = `${req.cookies.refreshTokenPayload}.${req.cookies.refreshTokenSignature}`;
  }

  if (!refreshToken) {
    next(new AppError('No refresh token found in header or cookies...', 401));
  }

  res.locals.refreshToken = refreshToken;
  next();
};
