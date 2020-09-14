import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { Request, Response, NextFunction, RequestHandler } from 'express';
import AppError from '../utils/appError';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function validateRequest(type: any): RequestHandler {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (req: Request, res: Response, next: NextFunction): any => {
    validate(plainToClass(type, req.body)).then((errors: ValidationError[]) => {
      if (errors.length > 0) {
        const message = errors.map((error: ValidationError) => Object.values(error.constraints)).join(', ');
        next(new AppError(message, 400));
      } else {
        next();
      }
    });
  };
}

export default validateRequest;
