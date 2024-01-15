import { IsNotEmpty } from 'class-validator';

export class SignUp {
  @IsNotEmpty()
  username: string;
  @IsNotEmpty()
  password: string;
}
