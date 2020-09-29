import { IsString, Length } from 'class-validator';

/**
 * @swagger
 *  components:
 *    schemas:
 *      CreateLocalUser DTO:
 *        type: object
 *        required:
 *          - name
 *          - password
 *          - passwordConfirm
 *          - email
 *        properties:
 *          name:
 *            type: string
 *          email:
 *            type: string
 *          password:
 *            type: string
 *          passwordConfirm:
 *            type: string
 *        example:
 *           name: faker
 *           email: fake@gmail.com
 *           password: fake12345
 *           passwordConfirm: fake12345
 */
class CreateLocalUserDto {
  @IsString()
  public name: string;

  @IsString()
  @Length(8, 100, {
    message: 'Password must have a minimum of 8 character, please.'
  })
  public password: string;

  @IsString()
  @Length(8, 100, {
    message: 'Password Confirm must have a minimum of 8 character, please.'
  })
  public passwordConfirm: string;

  @IsString()
  public email: string;
}

export default CreateLocalUserDto;
