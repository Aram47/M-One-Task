import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AuthModule } from 'src/auth/auth.module';
import { FriendshipGuard } from './frienship.guard';

@Module({
  imports: [AuthModule],
  controllers: [UserController],
  providers: [UserService, FriendshipGuard],
  exports: [UserService],
})
export class UserModule {}
