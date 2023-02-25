import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RoleService } from './role.service';
import { ProjectPagination } from 'src/interface/project.interface';

@Controller('role')
@ApiTags('角色模块')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth('jwt')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post('list')
  @ApiOperation({
    summary: '部门列表',
  })
  async searchAllMenu(@Body() body: ProjectPagination, @Req() request) {
    return await this.roleService.list(body);
  }
}
