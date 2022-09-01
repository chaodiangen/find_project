import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { IResponse } from 'src/interface/response.interface';
import { User } from 'src/modules/user/entities/user.entity';
import { UserService } from 'src/modules/user/user.service';
import { encrypt } from 'src/utils/encrtiption';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const svgCaptcha = require('svg-captcha');

const logger = new Logger('user.service');

@Injectable()
export class AuthService {
  private response: IResponse;
  private pointer = 0;
  private catches = '';
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * 登录验证
   * @param user
   */
  private async validateUser(user) {
    const phone: string = user.phone;
    const password: string = user.password;
    const captcha: string = user.captcha;
    if (captcha.toLocaleLowerCase() !== this.catches || captcha === '') {
      return (this.response = {
        code: 3,
        data: '验证码错误',
      });
    } else {
      const data = await this.verificationByPhone(phone, password);
      return data;
    }
  }

  /**
   * 登录
   * @param user
   * @returns
   */
  async login(user) {
    return await this.validateUser(user)
      .then((res: IResponse) => {
        if (res.code !== 0) {
          this.response = res;
          return this.response;
        }
        const result = {
          id: res.data.dataValues.id,
          name: res.data.dataValues.name,
          avatar: res.data.dataValues.avatar,
          phone: res.data.dataValues.phone,
        };
        user.id = res.data.dataValues.id;
        return this.createToken(user).then((res) => {
          this.response = {
            code: 0,
            data: {
              token: res.access_token,
              data: result,
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
   * 创建token
   * @param user
   * @returns
   */

  public async createToken(user: User) {
    return {
      access_token: this.jwtService.sign(user),
    };
  }
  /**
   * 注册
   * @param user
   * @returns
   */
  async register(user: User) {
    const _user = await this.userService.findOneByPhone(user.phone);
    if (_user) {
      this.response = {
        code: 1,
        data: '当前手机号已注册',
      };
      return this.response;
    } else {
      try {
        const createUser = new this.userModel(user);
        await createUser.save();
        this.response = {
          code: 0,
          data: '用户注册成功',
        };
        return this.response;
      } catch (error) {
        this.response = {
          code: 2,
          data: '用户注册失败，请联系相关负责人',
        };
        logger.log(error);
        return this.response;
      }
    }
  }
  /**
   * 输入当前密码 然后进行修改
   * @param user 修改用户密码
   * @returns
   */

  async updateUser(user) {
    const password: string = user.oldPassword;
    const phone: string = user.phone;
    const data = await this.verificationByPhone(phone, password);
    if (data.code === 0) {
      try {
        delete user.oldPassword;
        data.data.update({
          ...user,
        });
        return (this.response = {
          code: 0,
          data: '修改成功',
        });
      } catch (error) {
        return (this.response = {
          code: 2,
          data: '用户信息修改失败',
        });
      }
    } else {
      return data;
    }
  }

  /**
   *
   * @returns 获取验证码
   */
  async createCaptcha() {
    const c = svgCaptcha.create();
    this.catches = c.text.toLocaleLowerCase();
    console.log(this.catches);
    return (this.response = {
      code: 0,
      data: {
        id: this.pointer++,
        data: c.data,
      },
    });
  }

  /**
   * 验证验证码
   * @param captcha
   * @param id
   * @returns
   */
  async verification(captcha: string) {
    return (this.response =
      this.catches === captcha
        ? { code: 0, data: '验证通过' }
        : { code: 5, data: '验证码错误' });
  }

  /**
   *
   * @param user 手机号登录
   * @returns
   */
  async verificationByPhone(phone, password): Promise<any> {
    return await this.userService
      .findOneByPhone(phone)
      .then((res) => {
        if (!res) {
          this.response = {
            code: 3,
            data: '用户尚未注册',
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
            data: dbUser,
          });
        } else {
          return (this.response = {
            code: 1,
            data: '密码输入错误',
          });
        }
      })
      .catch(() => {
        return (this.response = {
          code: 4,
          data: '用户信息获取失败',
        });
      });
  }

  async deleteUser(id: number) {
    // 判断用户角色
    try {
      const user = await this.userService.findOneById(id);
      if (user.role !== 1) {
        await this.userService.remove(id);
        return (this.response = {
          code: 0,
          data: '删除成功',
        });
      } else {
        return (this.response = {
          code: 1,
          data: '删除失败',
        });
      }
    } catch (error) {
      return (this.response = {
        code: 4,
        data: '获取信息失败',
      });
    }
  }
}
