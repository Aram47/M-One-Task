import { IsEnum } from 'class-validator';

export class ResolveFriendRequestDto {
  @IsEnum(['accepted', 'rejected'], {
    message: 'Status must be either "accepted" or "rejected"',
  })
  status: 'accepted' | 'rejected';
}
