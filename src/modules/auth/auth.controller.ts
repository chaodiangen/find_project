import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
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

  @Post('update')
  @ApiOperation({
    summary: '用户修改接口',
  })
  async updateUser(@Body() user: User) {
    return await this.authService.updateUser(user);
  }
  @Get('captcha/:id')
  @ApiOperation({
    summary: '获取验证码',
  })
  async createCaptcha(@Param('id', ParseIntPipe) id: number) {
    return await this.authService.createCaptcha(id);
  }

  @Post('verify')
  @ApiOperation({
    summary: '验证取验证码',
  })
  async verification(@Body() captcha: { captcha: string; id: number }) {
    return await this.authService.verification(captcha.captcha, captcha.id);
  }
}
