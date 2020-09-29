import { IsString } from 'class-validator';

/**
 * @swagger
 *  components:
 *    schemas:
 *      GoogleUser DTO:
 *        type: object
 *        required:
 *          - access_token
 *        properties:
 *          access_token:
 *            type: string
 *        example:
 *           access_token: "dsdw43534rwfry65756uytyj"
 */
class GoogleUserDto {
  @IsString()
  public access_token: string;
}

export default GoogleUserDto;
