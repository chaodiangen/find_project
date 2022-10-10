import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { login, updateUser } from 'src/interface/user.interface';
import { User } from 'src/modules/user/entities/user.entity';
import { UppercaseAndLowercasePipe } from 'src/utils/uppercase-and-lowercase.pipe';
import { AuthService } from './auth.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { join } from 'path';
import multer = require('multer');
import { AuthGuard } from '@nestjs/passport';

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
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('jwt')
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
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('jwt')
  @ApiOperation({
    summary: '删除用户',
  })
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    return await this.authService.deleteUser(id);
  }
  /**
   * destination里面设置储存路径。
     filename这里为文件命名, 别忘了加上后缀。
     limits就是大小了。
     fileFilter做一些过滤操作与抛错。
   * @param file 
   * @param body 
   * @returns 
   */

  @Post('upload')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('jwt')
  @ApiOperation({
    summary: '修改头像',
  })
  // "file" 表示 上传文件的键名  files 变成数组,可以传递多个文件
  @UseInterceptors(
    FileInterceptor('file', {
      storage: multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, join(process.cwd(), 'data/avatar'));
        },
        filename: function (req, file, cb) {
          const unique = `${Date.now()}${Math.round(Math.random() * 1e9)}`;
          const imgPath = `${unique}.${file.mimetype.split('/')[1]}`;
          cb(null, imgPath);
        },
      }),
      limits: {
        fileSize: 1024 * 1024,
      },
      fileFilter(req, file, cb) {
        if (file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png') {
          throw new BadRequestException(`只支持jpg, png格式`);
        }
        cb(null, true);
      },
    }),
  )
  async upload(@UploadedFile() file: Express.Multer.File, @Req() request) {
    return await this.authService.uploads(file, request);
  }
}
