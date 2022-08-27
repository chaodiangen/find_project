import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { IResponse } from 'src/interface/response.interface';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  private response: IResponse;

  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userModel.findAll();
  }

  async findOne(id: string): Promise<User> {
    return this.userModel.findOne({
      where: {
        id,
      },
    });
  }

  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);
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
}
