import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { FriendsModule } from './friends/friends.module';

@Module({
  imports: [UserModule, AuthModule, FriendsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
