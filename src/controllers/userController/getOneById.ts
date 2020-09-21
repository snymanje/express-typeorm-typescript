import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import { User } from '../../entity/User';

export default async (req: Request, res: Response): Promise<void> => {
  //Get the ID from the url
  const id: string = req.params.id;

  //Get the user from database
  const userRepository = getRepository(User);
  try {
    await userRepository.findOneOrFail(id, {
      select: ['id', 'name', 'role'] //We dont want to send the password on response
    });
  } catch (error) {
    res.status(404).send('User not found');
  }
};
