import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { IResponse } from 'src/interface/response.interface';
import { UserService } from 'src/modules/user/user.service';
import { Project } from './entities/project.entity';
import { Op } from 'sequelize';

const logger = new Logger('project.service');
@Injectable()
export class ProjectService {
  private response: IResponse;
  constructor(
    private readonly userService: UserService,
    @InjectModel(Project) private readonly projectModel: typeof Project, // private readonly userService: UserService,
  ) {}

  /**
   * 创建项目
   * @param project
   */
  async createProject(project: Project, request) {
    try {
      const userId = request.user.userId;
      let identity = '';
      const user = await this.userService.findOneById(userId);
      if (user.role === 1) {
        identity = '管理员';
      } else if (user.role === 2) {
        identity = '项目经理';
      } else {
        identity = '普通用户';
      }
      const projectData = await this.projectModel.create({
        ...project,
        userId,
        status: 0,
        identity,
      });
      return (this.response = {
        code: 0,
        data: {
          projectId: projectData.id,
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
  async updateProject( project: Project) {
    const data = await this.findOneById(project.id);
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
  async searchAllProject(
    pageNum: number,
    pageSize: number,
    name: string,
    request,
  ) {
    try {
      const _id = request.user.userId;
      const { count, rows } = await this.projectModel.findAndCountAll({
        offset: Number(pageNum) - 1, // 查询的起始下标
        limit: Number(pageSize), // 查询的条数
        where: {
          name: {
            [Op.like]: '%' + name + '%',
          },
          userId: {
            [Op.eq]: _id,
          },
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
