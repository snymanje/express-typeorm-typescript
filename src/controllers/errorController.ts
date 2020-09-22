import { Request, Response, NextFunction } from 'express';
import AppError from '../utils/appError';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (error: AppError, req: Request, res: Response, next: NextFunction): void => {
  //console.log('Im in the error controller!!!');
  const status = error.status || 500;
  const message = error.message || 'Something went wrong';
  res.status(status).json({
    status: status,
    message: message
  });
};
