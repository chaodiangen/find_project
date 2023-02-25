import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { IResponse } from 'src/interface/response.interface';
import { Department } from './entities/department.entity';
const logger = new Logger('department.service');

@Injectable()
export class DepartmentService {
  private response: IResponse;
  constructor(
    @InjectModel(Department)
    private readonly departmentModel: typeof Department,
  ) {}

  /**
   * 部门列表
   * @returns
   */
  async list() {
    try {
      const data = await this.departmentModel.findAll();
      return (this.response = {
        code: 0,
        data: {
          list: data,
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
