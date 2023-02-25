import { Module } from '@nestjs/common';
import { DepartmentController } from './department.controller';
import { DepartmentService } from './department.service';
import { Department } from './entities/department.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModule } from '../user/user.module';

@Module({
  controllers: [DepartmentController],
  providers: [DepartmentService],
  imports: [UserModule, SequelizeModule.forFeature([Department])],
})
export class DepartmentModule {}
