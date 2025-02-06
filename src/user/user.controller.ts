import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto';
import { FindUserDto } from './dto/find-user.dto';
import { UserExistsPipe } from './pipes/user-exists.pipe';
import { AuthGuard } from '../auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  async findOne(@Param('id', UserExistsPipe) id: string) {
    return this.userService.findById(Number(id));
  }

  @Get('')
  async find(@Query() dto: FindUserDto) {
    return this.userService.find(dto);
  }

  @Patch(':id')
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
}
