import { Request, Response, NextFunction } from 'express';
import AppError from '../utils/appError';

export const checkRole = (roles: Array<string>) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    if (!roles.includes(res.locals.jwtPayload.role)) {
      return next(new AppError('You are not autherized to access this data.', 403));
    }
    next();
  };
};
