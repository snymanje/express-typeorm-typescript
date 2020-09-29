import { IsEmail, IsString } from 'class-validator';

/**
 * @swagger
 *  components:
 *    schemas:
 *      ResetPassword DTO:
 *        type: object
 *        required:
 *          - email
 *          - password
 *          - passwordConfirm
 *        properties:
 *          email:
 *            type: string
 *            format: email
 *          password:
 *            type: string
 *            format: password
 *          passwordConfirm:
 *            type: string
 *            format: password
 *        example:
 *           email: "fake@gmail.com"
 *           password: "123456"
 *           passwordConfirm: "123456"
 */
class resetPasswordDto {
  @IsEmail()
  public email: string;

  @IsString()
  public password: string;

  @IsString()
  public passwordConfirm: string;
}

export default resetPasswordDto;
