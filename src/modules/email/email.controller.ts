import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';
import { EmailService } from './email.service';

@ApiTags('发送邮件')
@Controller('email')
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
