import { Controller, Get, Body, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entities/user.entity';

import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('user')
@ApiTags('用户模块')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('register')
  @ApiOperation({
    summary: '用户进行注册',
  })
  async register(@Body() user: User) {
    return await this.userService.register(user);
  }

  @Get()
  async getFindAll() {
    return await this.userService.findAll();
  }
}
