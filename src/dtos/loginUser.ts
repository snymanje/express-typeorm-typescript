import { IsString } from 'class-validator';

class loginUserDto {
  @IsString()
  public password: string;

  @IsString()
  public email: string;
}

export default loginUserDto;
