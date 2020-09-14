import { IsString } from 'class-validator';

class CreateUserDto {
  @IsString()
  public username: string;

  @IsString()
  public password: string;

  @IsString()
  public role: string;
}

export default CreateUserDto;
