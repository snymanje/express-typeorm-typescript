import { Request, Response } from 'express';
import userService from '../../services/userService';

export default async (req: Request, res: Response): Promise<void> => {
  const user = await userService.newUser(req.body);
  res.status(201).json({
    status: 'Successfull',
    message: 'Users retreived.',
    data: user
  });
};
