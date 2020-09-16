import { IsString } from 'class-validator';

class CreateUserDto {
  @IsString()
  public name: string;

  @IsString()
  public password: string;

  @IsString()
  public role: string;

  @IsString()
  public email: string;
}

export default CreateUserDto;
