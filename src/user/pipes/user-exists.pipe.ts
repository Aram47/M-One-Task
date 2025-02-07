import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class UserExistsPipe implements PipeTransform {
  constructor(private readonly prisma: PrismaService) {}
  async transform(id: string) {
    if (!id) {
      throw new BadRequestException('No id provided');
    }
    const user = await this.prisma.user.findUnique({
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
