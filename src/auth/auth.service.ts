import { Injectable, Logger, Res } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { IResponse } from 'src/interface/response.interface';
import { User } from 'src/modules/user/entities/user.entity';
import { UserService } from 'src/modules/user/user.service';
import { encrypt } from 'src/utils/encrtiption';

const logger = new Logger('user.service');

@Injectable()
export class AuthService {
  private response: IResponse;
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   *
   * @param user 登录验证
   */
  private async validateUser(user: User) {
    const phone: string = user.phone;
    const password: string = user.password;
    return await this.userService
      .findOneByPhone(phone)
      .then((res) => {
        if (!res) {
          this.response = {
            code: 3,
            msg: '用户尚未注册',
          };
          throw this.response;
        }
        return res;
      })
      .then((dbUser: User) => {
        const pass = encrypt(password, dbUser.salt);
        if (pass === dbUser.password) {
          return (this.response = {
            code: 0,
            msg: {
              userId: dbUser.id,
            },
          });
        } else {
          this.response = {
            code: 4,
            msg: '登录失败',
          };
          throw this.response;
        }
      })
      .catch((err) => {
        return err;
      });
  }

  /**
   *
   * @param user 登录
   * @returns
   */
  async login(user: User) {
    return await this.validateUser(user)
      .then((res: IResponse) => {
        if (res.code !== 0) {
          this.response = res;
          return this.response;
        }
        const userId = res.msg.userId;
        return this.createToken(user).then((res) => {
          this.response = {
            code: 0,
            msg: {
              token: res.access_token,
              userId: userId,
            },
          };
          return this.response;
        });
      })
      .catch((err) => {
        return err;
      });
  }
  /**
   *
   * @param user 创建token
   * @returns
   */

  public async createToken(user: User) {
    return {
      access_token: this.jwtService.sign(user),
    };
  }
  /**
   *
   * @param user 注册
   * @returns
   */
  async register(user: User) {
    const _user = await this.userService.findOneByPhone(user.phone);
    if (_user) {
      this.response = {
        code: 1,
        msg: '当前手机号已注册',
      };
      return this.response;
    } else {
      try {
        const createUser = new this.userModel(user);
        await createUser.save();
        this.response = {
          code: 0,
          msg: '用户注册成功',
        };
        return this.response;
      } catch (error) {
        this.response = {
          code: 2,
          msg: '用户注册失败，请联系相关负责人',
        };
        logger.log(error);
        return this.response;
      }
    }
  }
}
