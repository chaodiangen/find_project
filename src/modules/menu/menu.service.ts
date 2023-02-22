import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { IResponse } from 'src/interface/response.interface';
import { UserService } from 'src/modules/user/user.service';
import { Menu } from './entities/menu.entity';
const logger = new Logger('menu.service');

// 菜单 增删改
@Injectable()
export class MenuService {
  private response: IResponse;
  constructor(
    private readonly userService: UserService,
    @InjectModel(Menu) private readonly menuModel: typeof Menu,
  ) {}

  /**
   * 创建菜单
   * @param menu
   * @param request
   * @returns
   */
  async createMenu(menu: Menu, request) {
    try {
      const userId = request.user.userId;
      const user = await this.userService.findOneById(userId);
      //   可以创建 菜单
      if (user.role === 1 || user.role === 2) {
        await this.menuModel.create(menu);
        return (this.response = {
          code: 0,
          data: {},
        });
      } else {
        return (this.response = {
          code: 1,
          data: '暂无权限创建',
        });
      }
    } catch (error) {
      logger.log(error);
      return (this.response = {
        code: 1,
        data: '创建失败',
      });
    }
  }
  /**
   * 菜单列表
   * @param request
   */
  async searchAllMenu(request) {
    try {
      const userId = request.user.userId;
      const user = await this.userService.findOneById(userId);
      if (user.role === 1) {
        const menuList = await this.menuModel.findAll();
        const newArr = menuList.map((item) => {
          return {
            item,
            children: '',
          };
        });
        const dataInfo = {};
        newArr.forEach((item, index) => {
          const { children } = item;
          if (!dataInfo[children]) {
            dataInfo[children] = {
              children,
              inventoryData: [],
            };
          }
          dataInfo[children].inventoryData.push(item);
        });
        const list = Object.values(dataInfo); // list 转换成功的数据
        return (this.response = {
          code: 0,
          data: {
            data: list,
          },
        });
      } else {
        return (this.response = {
          code: 1,
          data: '查找失败',
        });
      }
    } catch (error) {
      logger.log(error);
      return (this.response = {
        code: 1,
        data: '查找失败',
      });
    }
  }
}
