import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiProperty,
  ApiTags,
} from '@nestjs/swagger';
import { EmailService } from './email.service';
import { AuthGuard } from '@nestjs/passport';
@ApiTags('发送邮件')
@Controller('email')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth('jwt')
export class EmailController {
  constructor(private readonly mailerService: EmailService) {}
  @Get('send/:emial')
  @ApiProperty({
    example: '',
    description: '邮箱',
  })
  @ApiOperation({
    summary: '发送邮件',
  })
  async sendEmail(@Param('emial') email: string) {
    return await this.mailerService.sendEmail(email);
  }
}
