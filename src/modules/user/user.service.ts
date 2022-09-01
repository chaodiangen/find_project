import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  public client;
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
  ) {}

  /**
   * 获取用户
   * @returns
   */
  async findAll(): Promise<User[]> {
    return this.userModel.findAll();
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
