import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, password: string) {
    const user = await this.userService.findUserByUsername(username);
    if (!user) new UnauthorizedException('Wrong credentials');
    const isPasswordMatched = await bcrypt.compare(password, user?.password);
    if (!isPasswordMatched) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(username: string, password: string) {
    const user = await this.userService.findUserByUsername(username);
    if (user)
      throw new ConflictException(
        `There's already a user with the username: ${username}`,
      );

    const hashedPassword = await bcrypt.hash(password, 10);
    await this.userService.registerUser(username, hashedPassword);
  }
}
