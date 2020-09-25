import { IsString } from 'class-validator';

class Tokens {
  @IsString()
  public access_token: string;

  @IsString()
  public refresh_token: string;
}

export default Tokens;
