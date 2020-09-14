import 'reflect-metadata';
import { createConnection } from 'typeorm';

export default createConnection()
  .then(async () => {
    // Create a new express application instance
    console.info('Conected to DB!!!');
  })
  .catch((error) => console.log(error));
