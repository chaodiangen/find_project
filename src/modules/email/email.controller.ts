import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { EmailService } from './email.service';

@ApiTags('发送邮件')
@Controller('email')
export class EmailController {
  constructor(private readonly mailerService: EmailService) {}
  @Get('email')
  @ApiOperation({
    summary: '发送邮件',
  })
  async sendEmail() {
    return await this.mailerService.sendEmail();
  }
}
