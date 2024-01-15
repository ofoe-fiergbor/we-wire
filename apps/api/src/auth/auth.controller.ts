import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignIn } from './dto/sign_in';
import { SignUp } from './dto/sign_up';
import { Public } from './auth.decorators';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  signIn(@Body() signInDto: SignIn) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }

  @Public()
  @HttpCode(HttpStatus.CREATED)
  @Post('sign-up')
  signup(@Body() signInDto: SignUp) {
    return this.authService.signUp(signInDto.username, signInDto.password);
  }

  @Get('me')
  me(@Request() req: any) {
    /**
     * {
     *     "sub": "420201e0-5a62-4910-8f0e-3eaa34117391",
     *     "username": "username",
     *     "iat": 1705179984,
     *     "exp": 1705266384
     * }
     * */
    return req.user;
  }
}
