import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import { IResponse } from 'src/interface/response.interface';
import { Op } from 'sequelize';
@Injectable()
export class UserService {
  private response: IResponse;
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
  ) {}

  /**
   * 获取用户
   * @returns
   */
  async findAll(pageNum: number, pageSize: number, name: string = '') {
    try {
      let total = 0;
      let list: any[] = [];
      if (name.length) {
        const { count, rows } = await this.userModel.findAndCountAll({
          offset: Number(pageNum) - 1, // 查询的起始下标
          limit: Number(pageSize), // 查询的条数
          where: {
            name: {
              [Op.like]: '%' + name + '%',
            },
          },
        });
        total = count;
        list = rows;
      } else {
        const { count, rows } = await this.userModel.findAndCountAll({
          offset: Number(pageNum) - 1, // 查询的起始下标
          limit: Number(pageSize), // 查询的条数
        });
        total = count;
        list = rows;
      }
      let newList: any[] = [];
      list.forEach((item) => {
        newList.push({
          id: item.id,
          name: item.name,
          phone: item.phone,
          avatar: item.avatar,
          role: item.role,
          enable: 1,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
        });
      });
      return (this.response = {
        code: 0,
        data: {
          list: newList,
          total: total,
        },
      });
    } catch (error) {
      return (this.response = {
        code: 1,
        data: '查找失败',
      });
    }
  }

  /**
   * 根据id查找项目
   * @param id
   * @returns
   */
  async findOneById(id: number): Promise<User> {
    return await this.userModel.findOne({
      where: {
        id,
      },
    });
  }

  /**
   * 删除用户
   * @param id
   */
  async remove(id: number): Promise<void> {
    // 只有管理员才可以删除
    const user = await this.findOneById(id);
    await user.destroy();
  }
  /**
   * 通过手机号查询用户
   * @param phone
   * @returns
   */
  async findOneByPhone(phone: string): Promise<User> {
    return this.userModel.findOne({
      where: {
        phone,
      },
    });
  }

  /**
   * 通过密码查询用户
   * @param password
   * @returns
   */
  async findOneByPassword(password: string): Promise<User> {
    return this.userModel.findOne({
      where: {
        password,
      },
    });
  }
}
