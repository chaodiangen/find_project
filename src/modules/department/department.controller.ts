import { Body, Controller, Post, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { DepartmentService } from './department.service';

@Controller('department')
@ApiTags('部门模块')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth('jwt')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Post('list')
  @ApiOperation({
    summary: '部门列表',
  })
  async searchAllMenu(@Body() body, @Req() request) {
    return await this.departmentService.list();
  }
}
