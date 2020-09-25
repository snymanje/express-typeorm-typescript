import { IsString } from 'class-validator';

/**
 * @swagger
 *  components:
 *    schemas:
 *      Email DTO:
 *        type: object
 *        required:
 *          - email
 *        properties:
 *          email:
 *            type: string
 *            format: email
 *        example:
 *           email: fake@email.com
 */
class Email {
  @IsString()
  public email: string;
}

export default Email;
