import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Users } from '@prisma/client';
import { FindUserDto } from './dto/find-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<Users> {
    return await this.prisma.users.create({ data: createUserDto });
  }

  async findById(id: number) {
    const user = await this.prisma.users.findUnique({
      where: {
        id,
      },
    });
    return user;
  }

  async find(dto: FindUserDto) {
    const data: Users = JSON.parse(JSON.stringify(dto));
    const user = await this.prisma.users.findMany({
      where: {
        ...data,
      },
    });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    return user;
  }

  async findByEmail(email: string): Promise<Users> {
    const user = await this.prisma.users.findUnique({
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
    const user = await this.prisma.users.update({
      where: {
        id,
      },
      data: updateUserDto,
    });

    return user;
  }

  async remove(id: number) {
    await this.prisma.users.delete({
      where: {
        id,
      },
    });

    return { message: 'User deleted successfully' };
  }
}
