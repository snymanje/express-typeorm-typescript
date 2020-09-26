import { Request, Response } from 'express';
import userService from '../../services/userService';

export default async (req: Request, res: Response): Promise<void> => {
  const user = await userService.deleteUser(Number(req.params.id));
  res.status(201).json({
    status: 'Successfull',
    message: `${user.email} was successfully deleted!`
  });
};
