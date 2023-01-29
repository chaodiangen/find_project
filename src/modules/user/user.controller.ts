import { Body, Controller, Post, UseGuards, Req } from '@nestjs/common';
import { UserService } from './user.service';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { userPagination } from 'src/interface/user.interface';
@Controller('user')
@ApiTags('用户模块')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth('jwt')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('list')
  async getFindAll(@Body() body: userPagination) {
    return await this.userService.findAll(
      body.pageNum,
      body.pageSize,
      body.name,
    );
  }
}
