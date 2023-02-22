import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Menu } from './entities/menu.entity';
import { MenuService } from './menu.service';

@Controller('menu')
@ApiTags('菜单模块')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth('jwt')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}
  @Post('create')
  @ApiOperation({
    summary: '创建菜单',
  })
  async createMenu(@Body() menu: Menu, @Req() request) {
    return await this.menuService.createMenu(menu, request);
  }

  @Get('list')
  @ApiOperation({
    summary: '菜单列表',
  })
  async searchAllMenu(@Req() request) {
    return await this.menuService.searchAllMenu(request);
  }
}