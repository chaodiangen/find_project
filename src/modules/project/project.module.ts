import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Project } from './entities/project.entity';

@Module({
  providers: [ProjectService],
  controllers: [ProjectController],
  imports: [SequelizeModule.forFeature([Project])],
})
export class ProjectModule {}
