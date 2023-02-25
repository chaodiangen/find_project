import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { IResponse } from 'src/interface/response.interface';
import { Role } from './entities/role.entity';
import { Op } from 'sequelize';
const logger = new Logger('role.service');

@Injectable()
export class RoleService {
  private response: IResponse;
  constructor(@InjectModel(Role) private readonly roleModel: typeof Role) {}

  /**
   * 角色列表
   * @returns
   */
  async list(body) {
    try {
      const { pageNum, pageSize } = body;
      const rows = await this.roleModel.findAll();
      // 不同身份有不同权限
      return (this.response = {
        code: 0,
        data: {
          list: rows,
        },
      });
    } catch (error) {
      logger.log(error);
      return (this.response = {
        code: 1,
        data: '查找失败',
      });
    }
  }
}
