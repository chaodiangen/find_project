import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';

@ApiTags('总模块')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiProperty({
    description: '测试接口',
  })
  @ApiOperation({
    summary: '测试',
  })
  getHello(): string {
    return this.appService.getHello();
  }
}
