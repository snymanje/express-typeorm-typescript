import { IsString, IsEmail } from 'class-validator';

/**
 * @swagger
 *  components:
 *    schemas:
 *      EditUser DTO:
 *        type: object
 *        required:
 *          - name
 *          - email
 *          - role
 *        properties:
 *          name:
 *            type: string
 *            format: name
 *          email:
 *            type: string
 *            format: email
 *          role:
 *            type: string
 *            format: email
 *        example:
 *           name: faker
 *           email: fake@email.com
 *           role: user
 */
class EditUserDto {
  @IsString()
  public name: string;

  @IsEmail()
  public email: string;

  @IsString()
  public role: string;
}

export default EditUserDto;
