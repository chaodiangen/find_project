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

  async findAll(): Promise<User[]> {
    return this.userModel.findAll();
  }

  async findOneById(id: string): Promise<User> {
    return this.userModel.findOne({
      where: {
        id,
      },
    });
  }

  async remove(id: string): Promise<void> {
    const user = await this.findOneById(id);
    await user.destroy();
  }
  /**
   * 通过手机号查询用户
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
   */
  async findOneByPassword(password: string): Promise<User> {
    return this.userModel.findOne({
      where: {
        password,
      },
    });
  }
}
