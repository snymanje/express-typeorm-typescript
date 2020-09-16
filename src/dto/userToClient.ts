import { IsString } from 'class-validator';

class UserToClientDto {
  @IsString()
  public id: number;

  @IsString()
  public authMethod: string;

  @IsString()
  public role: string;

  @IsString()
  public name: string;

  @IsString()
  public email: string;
}

export default UserToClientDto;
