import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from 'src/modules/user/entities/user.entity';
import { AuthService } from './auth.service';

@Controller('auth')
@ApiTags('登录')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  @ApiOperation({
    summary: '用户登录',
  })
  public async login(@Body() userDto: User) {
    return this.authService.login(userDto);
  }

  @Post('register')
  @ApiOperation({
    summary: '用户进行注册',
  })
  async register(@Body() user: User) {
    return await this.authService.register(user);
  }
}
