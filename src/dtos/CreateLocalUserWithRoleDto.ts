import { IsString, Length } from 'class-validator';

/**
 * @swagger
 *  components:
 *    schemas:
 *      CreateLocalUserWithRole DTO:
 *        type: object
 *        required:
 *          - name
 *          - password
 *          - passwordConfirm
 *          - email
 *          - role
 *        properties:
 *          name:
 *            type: string
 *            format: name
 *          password:
 *            type: string
 *            format: email
 *          passwordConfirm:
 *            type: string
 *            format: email
 *          email:
 *            type: string
 *            format: email
 *          role:
 *            type: string
 *            format: email
 *        example:
 *           name: faker
 *           password: 12345
 *           passwordConfirm: 12345
 *           email: fake@email.com
 *           role: user
 */
class CreateLocalUserWithRoleDto {
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

  @IsString()
  public role: string;
}

export default CreateLocalUserWithRoleDto;
