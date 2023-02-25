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
        const newArr = [];
        menuList.forEach((item, index) => {
          if (item.type === 1) {
            newArr.push({
              id: item.id,
              name: item.name,
              icon: item.icon,
              sort: item.sort,
              type: item.type,
              url: item.url,
              createdAt: item.createdAt,
              updatedAt: item.updatedAt,
              children: [],
            });
            menuList.forEach((i, k) => {
              if (i.type === 2 && item.id === i.parent_id) {
                newArr[index].children.push({
                  id: i.id,
                  name: i.name,
                  icon: i.icon,
                  sort: i.sort,
                  type: i.type,
                  url: i.url,
                  createdAt: i.createdAt,
                  updatedAt: i.updatedAt,
                  children: menuList.filter((y) => {
                    return y.type === 3 && y.parent_id === i.id;
                  }),
                });
              }
            });
          }
        });

        return (this.response = {
          code: 0,
          data: {
            list: newArr,
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
  /**
   * 修改菜单
   * @param body
   * @param request
   * @returns
   */
  async updatedMenu(body, request) {
    try {
      const userId = request.user.userId;
      const user = await this.userService.findOneById(userId);
      if (user.role === 1) {
        const data = await this.findOneById(body.id);
        await data.update(body);
        return (this.response = {
          code: 0,
          data: '修改成功',
        });
      } else {
        return (this.response = {
          code: 1,
          data: '暂无权限修改',
        });
      }
    } catch (error) {
      logger.log(error);
      return (this.response = {
        code: 1,
        data: '修改失败',
      });
    }
  }

  async deleteMenu(id, request) {
    try {
      const userId = request.user.userId;
      const user = await this.userService.findOneById(userId);
      if (user.role === 1) {
        const data = await this.findOneById(id);
        await data.destroy();
        return (this.response = {
          code: 0,
          data: '删除成功',
        });
      } else {
        return (this.response = {
          code: 1,
          data: '暂无权限删除',
        });
      }
    } catch (error) {
      logger.log(error);
      return (this.response = {
        code: 1,
        data: '删除失败',
      });
    }
  }

  /**
   * 查找菜单
   * @param id
   * @returns
   */
  findOneById(id: number) {
    return this.menuModel.findOne({
      where: {
        id,
      },
    });
  }
}
