import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import { User } from '../../entity/User';

export default async (req: Request, res: Response): Promise<void> => {
  //Get the ID from the url
  const id = req.params.id;

  //Get values from the body
  //const { username } = req.body;

  //Try to find user on database
  const userRepository = getRepository(User);
  try {
    await userRepository.findOneOrFail(id);
  } catch (error) {
    //If not found, send a 404 response
    res.status(404).send('User not found');
    return;
  }
};
