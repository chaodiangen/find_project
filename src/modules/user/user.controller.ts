import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';

import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Role } from '../role/role.decorator';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
@ApiTags('用户模块')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth('jwt')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('all')
  async getFindAll() {
    return await this.userService.findAll();
  }

  //   //   装饰器
  //   @Get('hello')
  //   @Role('admin')
  //   hello() {
  //     return '123';
  //   }
}
