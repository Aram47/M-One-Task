import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class UserExistsPipe implements PipeTransform {
  constructor(private readonly prisma: PrismaService) {}
  async transform(id: string) {
    const user = await this.prisma.users.findUnique({
      where: {
        id: Number(id),
      },
    });
    if (!user) {
      throw new BadRequestException('User does not exist');
    }
    return id;
  }
}
