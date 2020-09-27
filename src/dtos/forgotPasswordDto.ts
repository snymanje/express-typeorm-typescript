import { IsString } from 'class-validator';

/**
 * @swagger
 *  components:
 *    schemas:
 *      forgotPassword DTO:
 *        type: object
 *        required:
 *          - email
 *        properties:
 *          email:
 *            type: string
 *            format: email
 *        example:
 *           email: fake@gmail.com
 */
class forgotPassword {
  @IsString()
  public email: string;
}

export default forgotPassword;
