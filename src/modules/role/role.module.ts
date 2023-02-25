import { Module } from '@nestjs/common';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModule } from '../user/user.module';
import { Role } from './entities/role.entity';


@Module({
  controllers: [RoleController],
  providers: [RoleService],
  imports: [UserModule, SequelizeModule.forFeature([Role])],
})
export class RoleModule {}
