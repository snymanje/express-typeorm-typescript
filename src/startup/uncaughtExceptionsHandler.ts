import 'express-async-errors';
/* const logger = require('../utils/logger'); */

process.on('uncaughtException', (ex: Error) => {
  console.log('We are in uncaughtException');
  console.log(ex.message);
  /*  logger.error(ex.message, ex); */
  process.exit(1);
});
process.on('unhandledRejection', (ex: Error) => {
  console.log('We are in unhandledRejection');
  console.log(ex.message);
  /* logger.error(ex.message, ex); */
  process.exit(1);
});
