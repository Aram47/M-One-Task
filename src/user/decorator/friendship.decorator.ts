import { BadRequestException, createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Friends } from '@prisma/client';

export const Friendship = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const request = context.switchToHttp().getRequest();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment
    const friendsip: Friends = request.friendship;
    if (!friendsip) {
      throw new BadRequestException('No friend request');
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return friendsip;
  },
);
