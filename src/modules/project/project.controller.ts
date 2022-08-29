import {
  Body,
  Controller,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiProperty,
  ApiTags,
} from '@nestjs/swagger';
import { ProjectPagination } from 'src/interface/project.interface';
import { Project } from './entities/project.entity';
import { ProjectService } from './project.service';

@Controller('project')
@ApiTags('项目模块')
// @UseGuards(AuthGuard('jwt'))
// @ApiBearerAuth('jwt')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post('create')
  @ApiOperation({
    summary: '创建项目',
  })
  async createProject(@Body() project: Project) {
    return await this.projectService.createProject(project);
  }

  @Post('delete/:id')
  @ApiOperation({
    summary: '删除项目',
  })
  async deleteProject(@Param('id') projectId: string) {
    return await this.projectService.deleteProject(projectId);
  }

  @Post('find/:id')
  @ApiOperation({
    summary: '修改项目',
  })
  async updateProject(@Param('id') id: string, @Body() project: Project) {
    return await this.projectService.updateProject(id, project);
  }
  @Post('search')
  @ApiOperation({
    summary: '查找项目',
  })
  async searchNameProject(@Body() body: ProjectPagination) {
    return await this.projectService.searchNameProject(
      body.pageNum,
      body.pageSize,
      body.name,
    );
  }
}
