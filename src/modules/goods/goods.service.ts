import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { IResponse } from 'src/interface/response.interface';
import { Op } from 'sequelize';
import { Goods } from './entities/foods.entity';

const logger = new Logger('goods.service');
@Injectable()
export class GoodsService {
  private response: IResponse;
  constructor(
    @InjectModel(Goods) private readonly goodsModel: typeof Goods, // private readonly userService: UserService,
  ) {}

  async categoryCountList() {
    try {
      return (this.response = {
        code: 0,
        data: [
          { goodsCount: 1048, name: '女装' },
          { goodsCount: 735, name: '男装' },
          { goodsCount: 580, name: '上衣' },
          { goodsCount: 484, name: '裤子' },
          { goodsCount: 300, name: '裙子' },
        ],
      });
    } catch (error) {
      logger.log(error);
      return (this.response = {
        code: 1,
        data: '查询失败',
      });
    }
  }
  async categorySaleList() {
    try {
      return (this.response = {
        code: 0,
        data: [
          { goodsCount: 1048, name: '女装' },
          { goodsCount: 735, name: '男装' },
          { goodsCount: 580, name: '上衣' },
          { goodsCount: 484, name: '裤子' },
          { goodsCount: 300, name: '裙子' },
        ],
      });
    } catch (error) {
      logger.log(error);
      return (this.response = {
        code: 1,
        data: '查询失败',
      });
    }
  }
  async categoryFavorList() {
    try {
      return (this.response = {
        code: 0,
        data: [
          { goodsFavor: 1048, name: '女装' },
          { goodsFavor: 735, name: '男装' },
          { goodsFavor: 580, name: '上衣' },
          { goodsFavor: 484, name: '裤子' },
          { goodsFavor: 300, name: '裙子' },
        ],
      });
    } catch (error) {
      logger.log(error);
      return (this.response = {
        code: 1,
        data: '查询失败',
      });
    }
  }
  async addressSaleList() {
    try {
      return (this.response = {
        code: 0,
        data: [
          { name: '台湾', value: 1 },
          { name: '北京', value: 2 },
          { name: '天津', value: 3 },
          { name: '河北', value: 4 },
          { name: '山西', value: 5 },
          { name: '内蒙古', value: 6 },
          { name: '辽宁', value: 7 },
          { name: '吉林', value: 8 },
          { name: '黑龙江', value: 9 },
          { name: '上海', value: 100 },
          { name: '江苏', value: 200 },
          { name: '浙江', value: 12 },
          { name: '安徽', value: 103 },
          { name: '福建', value: 104 },
          { name: '江西', value: 105 },
          { name: '山东', value: 106 },
          { name: '河南', value: 17 },
          { name: '湖北', value: 18 },
          { name: '湖南', value: 19 },
          { name: '重庆', value: 20 },
          { name: '四川', value: 21 },
          { name: '贵州', value: 22 },
          { name: '云南', value: 23 },
          { name: '西藏', value: 24 },
          { name: '陕西', value: 25 },
          { name: '甘肃', value: 26 },
          { name: '青海', value: 27 },
          { name: '宁夏', value: 28 },
          { name: '新疆', value: 29 },
          { name: '广东', value: 30 },
          { name: '广西', value: 31 },
          { name: '海南', value: 32 },
        ],
      });
    } catch (error) {
      logger.log(error);
      return (this.response = {
        code: 1,
        data: '查询失败',
      });
    }
  }
}
