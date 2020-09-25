import { IsString } from 'class-validator';

class CreateGoogleUserDto {
  @IsString()
  public access_token: string;
}

export default CreateGoogleUserDto;
