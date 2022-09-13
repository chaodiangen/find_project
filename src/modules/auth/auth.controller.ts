import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { login, updateUser } from 'src/interface/user.interface';
import { User } from 'src/modules/user/entities/user.entity';
import { UppercaseAndLowercasePipe } from 'src/utils/uppercase-and-lowercase.pipe';
import { AuthService } from './auth.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('auth')
@ApiTags('登录')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  @ApiOperation({
    summary: '用户登录',
  })
  public async login(@Body() userDto: login) {
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
  async updateUser(@Body() user: updateUser) {
    return await this.authService.updateUser(user);
  }

  @Get('captcha')
  @ApiOperation({
    summary: '获取验证码',
  })
  async createCaptcha() {
    return await this.authService.createCaptcha();
  }

  @Get('verify/:captcha')
  @ApiOperation({
    summary: '验证取验证码',
  })
  async verification(
    @Param('captcha', UppercaseAndLowercasePipe) captcha: string,
  ) {
    return await this.authService.verification(captcha);
  }

  @Get('delete/:id')
  @ApiOperation({
    summary: '删除用户',
  })
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    return await this.authService.deleteUser(id);
  }

  @Post('upload')
  @ApiOperation({
    summary: '修改头像',
  })
  // "file" 表示 上传文件的键名  files 变成数组,可以传递多个文件
  @UseInterceptors(FileInterceptor('file'))
  async upload(@UploadedFile() file, @Body() body) {
    return await this.authService.uploads(file, body);
  }
}
