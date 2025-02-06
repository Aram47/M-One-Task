import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from 'src/user/dto';
import { LoginDto } from './dto';
import { EmailNotRegisteredPipe, EmailRegisteredPipe } from './pipes';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authServie: AuthService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  @Post('/register')
  async register(@Body(EmailNotRegisteredPipe) dto: CreateUserDto) {
    const saltrounds = 10;
    dto.password = await bcrypt.hash(dto.password, saltrounds);

    const user = await this.userService.create(dto);
    delete user.password;

    return user;
  }

  @Post('/login')
  async login(
    @Body(EmailRegisteredPipe) dto: LoginDto,
    @Res({
      passthrough: true,
    })
    res: Response,
  ) {
    const { user, token } = await this.authServie.login(dto);
    res.cookie('token', token, {
      httpOnly: true,
      signed: true,
      secure: true,
      maxAge: 10 * 60 * 60,
    });

    return { message: `Welcome, ${user.firstName} jan!` };
  }
}
