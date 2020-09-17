import { Request, Response, NextFunction, Application } from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import hpp from 'hpp'; // Parameter pollution
import compression from 'compression';
import routes from '../routes/index';
import AppError from '../utils/appError';

import globalErrorHandler from '../controllers/errorController';

export default (app: Application): void => {
  rateLimit({
    max: 1000,
    windowMs: 60 * 1000,
    message: 'Too many requests from this IP, try again later'
  });
  app.use(compression());
  app.use(cookieParser());
  app.use(helmet());
  app.use(
    hpp({
      whitelist: []
    })
  );
  app.use(
    cors({
      origin: 'http://localhost:3000',
      credentials: true
    })
  );
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use('/api/v1/', routes);
  app.all('*', (req: Request, res: Response, next: NextFunction) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!!!`, 404));
  });
  app.use(globalErrorHandler);
};
