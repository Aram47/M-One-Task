import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FriendshipGuard implements CanActivate {
  constructor(private readonly prisma: PrismaService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();

    const { user } = req;
    const id = Number(req.params.id);

    if (!id) {
      throw new BadRequestException('No id provided');
    }

    const friendship = this.prisma.friends.findUnique({
      where: {
        friendsId_friendOfId: {
          friendsId: user.id,
          friendOfId: id,
        },
        status: 'pending',
      },
    });

    if (!friendship) {
      throw new BadRequestException('No such friend request');
    }

    req.friendship = friendship;

    return true;
  }
}
