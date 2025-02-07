import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  Req,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto';
import { FindUserDto } from './dto/find-user.dto';
import { UserExistsPipe } from './pipes/user-exists.pipe';
import { AuthGuard } from '../auth/auth.guard';
import { Friends, User as prismaUser, User as PrismaUser } from '@prisma/client';
import { User } from './decorator/user.decorator';
import { isNotEmpty } from 'class-validator';
import { ResolveFriendRequestDto } from './dto/resolve-friend-request';
import { FriendshipGuard } from './frienship.guard';
import { Friendship } from './decorator/friendship.decorator';

@UseGuards(AuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('getById/:id')
  async findOne(@Param('id', UserExistsPipe) id: string) {
    return this.userService.findById(Number(id));
  }

  @Get('')
  async find(@Query() dto: FindUserDto) {
    return this.userService.find(dto);
  }

  @Patch('editUser/:id')
  async update(
    @Param('id', UserExistsPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(Number(id), updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id', UserExistsPipe) id: string) {
    return this.userService.remove(Number(id));
  }

  @Post('/sendFriendRequest/:id')
  async sendFriendRequest(
    @User() user: prismaUser,
    @Param('id', UserExistsPipe) id: string,
  ) {
    await this.userService.sendFriendRequest(user, Number(id));
    return { message: 'Success' };
  }

  @UseGuards(FriendshipGuard)
  @Patch('/resolveFriendRequest/:id')
  async resolveFriendRequest(
    @User() user: prismaUser,
    @Body() dto: ResolveFriendRequestDto,
    @Param('id', UserExistsPipe) id: string,
    @Friendship() friendship: Friends,
  ) {
    const result = await this.userService.resolveFriendRequest(
      user,
      Number(id),
      friendship,
      dto.status,
    );
    return { message: 'Resolved' };
  }

  @Get('/getFriendRequests')
  async getFriendRequests(@User() user: prismaUser) {
    return this.userService.getFriendRequests(user);
  }
}
