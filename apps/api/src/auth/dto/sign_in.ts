import { IsNotEmpty } from 'class-validator';

export class SignIn {
  @IsNotEmpty()
  username: string;
  @IsNotEmpty()
  password: string;
}
