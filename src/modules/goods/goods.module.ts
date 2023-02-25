import { Module } from '@nestjs/common';
import { GoodsController } from './goods.controller';
import { GoodsService } from './goods.service';
import { UserModule } from '../user/user.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Goods } from './entities/foods.entity';
@Module({
  controllers: [GoodsController],
  providers: [GoodsService],
  imports: [UserModule, SequelizeModule.forFeature([Goods])],
})
export class GoodsModule {}
