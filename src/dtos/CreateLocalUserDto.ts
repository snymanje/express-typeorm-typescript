import { IsString, Length } from 'class-validator';

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
