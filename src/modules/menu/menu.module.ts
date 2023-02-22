import { Module } from '@nestjs/common';
import { MenuService } from './menu.service';
import { MenuController } from './menu.controller';
import { UserModule } from '../user/user.module';
import { Menu } from './entities/menu.entity';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  providers: [MenuService],
  controllers: [MenuController],
  imports: [UserModule, SequelizeModule.forFeature([Menu])],
})
export class MenuModule {}
