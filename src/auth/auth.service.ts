import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private userService: UserService,
  ) {}

  async login(dto: LoginDto) {
    const user = await this.userService.findByEmail(dto.email);
    if (!(await bcrypt.compare(dto.password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const token = await this.jwtService.signAsync({
      email: user.email,
      id: user.id,
    });

    return { user, token };
  }

  // async login(user: any) {
  //   const tokens = await this.generateTokens(user.id, user.email);
  //   await this.userService.updateRefreshToken(user.id, tokens.refreshToken);
  //   return tokens;
  // }

  // async logout(userId: string) {
  //   await this.userService.updateRefreshToken(userId, null);
  //   return { message: 'Logged out' };
  // }

  // async refreshToken(userId: string, refreshToken: string) {
  //   const user = await this.userService.findById(userId);
  //   if (!user || !user.refreshToken) throw new UnauthorizedException('Invalid refresh token');

  //   const isValid = await bcrypt.compare(refreshToken, user.refreshToken);
  //   if (!isValid) throw new UnauthorizedException('Invalid refresh token');

  //   const tokens = await this.generateTokens(user.id, user.email);
  //   await this.userService.updateRefreshToken(user.id, tokens.refreshToken);
  //   return tokens;
  // }

  // private async generateTokens(userId: string, email: string) {
  //   const accessToken = this.jwtService.sign(
  //     { sub: userId, email },
  //     { secret: this.configService.get<string>('JWT_ACCESS_SECRET'), expiresIn: '15m' },
  //   );

  //   const refreshToken = this.jwtService.sign(
  //     { sub: userId, email },
  //     { secret: this.configService.get<string>('JWT_REFRESH_SECRET'), expiresIn: '7d' },
  //   );

  //   const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
  //   return { accessToken, refreshToken: hashedRefreshToken };
  // }
}
