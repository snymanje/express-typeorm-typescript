import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import AppError from '../utils/appError';
import { promisify } from 'util';
import config from '../config/config';

export const checkJwt = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  // check for a token
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    next(new AppError('You are not logged in', 401));
  }

  //Try to validate the token and get data
  const jwtPayload = await promisify(jwt.verify)(token, config.tokenSecret);
  res.locals.jwtPayload = jwtPayload;

  //The token is valid for 1 hour
  //We want to send a new token on every request
  /*  const { userId, username } = jwtPayload;
  const newToken = jwt.sign({ userId, username }, config.tokenSecret, {
    expiresIn: '1h'
  });
  res.setHeader('token', newToken); */

  //Call the next middleware or controller
  next();
};
