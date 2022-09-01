import { Module } from '@nestjs/common';

import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Project } from './entities/project.entity';
import { UserModule } from '../user/user.module';

@Module({
  providers: [ProjectService],
  controllers: [ProjectController],
  imports: [UserModule, SequelizeModule.forFeature([Project])],
})
export class ProjectModule {}
