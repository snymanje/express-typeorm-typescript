import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import { User } from '../../entity/User';

export default async (req: Request, res: Response): Promise<void> => {
  //Get the ID from the url
  const id = req.params.id;

  const userRepository = getRepository(User);
  try {
    await userRepository.findOneOrFail(id);
  } catch (error) {
    res.status(404).send('User not found');
    return;
  }
  userRepository.delete(id);

  //After all send a 204 (no content, but accepted) response
  res.status(204).send();
};
