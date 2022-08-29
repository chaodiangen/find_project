import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { IResponse } from 'src/interface/response.interface';
import { Project } from './entities/project.entity';

const logger = new Logger('project.service');
@Injectable()
export class ProjectService {
  private response: IResponse;
  constructor(
    @InjectModel(Project) private readonly projectModel: typeof Project,
  ) {}
  /**
   * 创建项目
   * @param project
   */
  async createProject(project: Project) {
    try {
      const data = await this.projectModel.create({
        ...project,
      });
      return (this.response = {
        code: 0,
        data: {
          projectId: data.id,
        },
      });
    } catch (error) {
      logger.log(error);
      return (this.response = {
        code: 1,
        data: '创建失败',
      });
    }
  }

  /**
   * 查找项目
   * @param id
   * @returns
   */
  async findOneById(id: string): Promise<Project> {
    return this.projectModel.findOne({
      where: {
        id,
      },
    });
  }

  /**
   * 删除项目
   * @param projectId
   * @returns
   */
  async deleteProject(projectId: string) {
    const data = await this.findOneById(projectId);
    try {
      await data.destroy();
      return (this.response = {
        code: 0,
        data: '删除成功',
      });
    } catch (error) {
      logger.log(error);
      return (this.response = {
        code: 1,
        data: '删除失败',
      });
    }
  }

  /**
   * 修改项目
   * @param projectId 项目id
   * @param project 修改值
   * @returns
   */
  async updateProject(projectId: string, project: Project) {
    const data = await this.findOneById(projectId);
    try {
      data.update(project);
      return (this.response = {
        code: 0,
        data: '修改成功',
      });
    } catch (error) {
      return (this.response = {
        code: 1,
        data: '修改失败',
      });
    }
  }

  /**
   * 查找项目
   * @param project
   * @returns
   */
  async searchNameProject(pageNum: number, pageSize: number, name: string) {
    try {
      const { count, rows } = await this.projectModel.findAndCountAll({
        offset: Number(pageNum) - 1, // 查询的起始下标
        limit: Number(pageSize), // 查询的条数
        where: {
          name,
        },
      });
      return (this.response = {
        code: 0,
        data: {
          data: rows,
          total: count,
        },
      });
    } catch (error) {
      return (this.response = {
        code: 1,
        data: '查找失败',
      });
    }
  }
}
