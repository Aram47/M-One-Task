import { BadRequestException, ConsoleLogger, Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Friends, User } from '@prisma/client';
import { FindUserDto } from './dto/find-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    return await this.prisma.user.create({ data: createUserDto });
  }

  async findById(id: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
    return user;
  }

  async find(dto: FindUserDto) {
    const data: User = JSON.parse(JSON.stringify(dto));
    const user = await this.prisma.user.findMany({
      where: {
        ...data,
      },
    });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.prisma.user.update({
      where: {
        id,
      },
      data: updateUserDto,
    });

    return user;
  }

  async remove(id: number) {
    await this.prisma.user.delete({
      where: {
        id,
      },
    });

    return { message: 'User deleted successfully' };
  }

  async sendFriendRequest(user: User, id: number) {
    const friendship = await this.prisma.friends.create({
      data: {
        friendOfId: user.id,
        friendsId: id,
      },
    });

    return friendship;
  }

  async resolveFriendRequest(
    user: User,
    id: number,
    friendship: Friends,
    status: string,
  ) {
    friendship.status = status;

    let result = null;

    if (status === 'rejected') {
      result = await this.prisma.friends.delete({
        where: {
          friendsId_friendOfId: {
            friendsId: user.id,
            friendOfId: id,
          },
          status: 'pending',
        },
      });
    } else {
      result = await this.prisma.friends.update({
        where: {
          friendsId_friendOfId: {
            friendsId: user.id,
            friendOfId: id,
          },
          status: 'pending',
        },
        data: friendship,
      });
    }

    return result;
  }

  async getFriendRequests(user: User) {
    const friendRequests = await this.prisma.friends.findMany({
      where: {
        friendsId: user.id,
        status: 'pending',
      },
    });
    return friendRequests;
  }
}
