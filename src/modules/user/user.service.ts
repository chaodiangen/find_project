import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ApiProperty } from '@nestjs/swagger';
import { User } from './entities/user.entity';
@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  @ApiProperty({
    description: '获取全部用户',
  })
  async register(user: User): Promise<void> {
    const _user = await this.userModel.findOne({
      where: {
        name: user.name,
      },
    });
    if (_user) {
    } else {
      const createUser = new this.userModel(user);
      await createUser.save();
    }
  }
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
}
