import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { GoodsService } from './goods.service';

@Controller('goods')
@ApiTags('商品')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth('jwt')
export class GoodsController {
  constructor(private readonly goodsService: GoodsService) {}

  @Get('category/count')
  @ApiOperation({
    summary: '商品数量',
  })
  async categoryCount() {
    return await this.goodsService.categoryCountList();
  }
  @Get('category/sale')
  @ApiOperation({
    summary: '商品销售',
  })
  async categorySale() {
    return await this.goodsService.categorySaleList();
  }
  @Get('category/favor')
  @ApiOperation({
    summary: '商品收藏',
  })
  async categoryFavor() {
    return await this.goodsService.categoryFavorList();
  }
  @Get('address/sale')
  @ApiOperation({
    summary: '出售地址',
  })
  async addressSale() {
    return await this.goodsService.addressSaleList();
  }
}
