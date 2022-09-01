import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import * as models from './index';
// 导入所有模型
const allModels = [];
for (const key in models) {
  if (Object.prototype.hasOwnProperty.call(models, key)) {
    const element = models[key];
    allModels.push(element);
  }
}

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: '47.100.70.129',
      port: 3306,
      username: 'root',
      password: '!@#123456',
      database: 'nest_export',
      models: allModels,
      pool: {
        max: 1000, // 连接池中最大连接数量
        min: 0, // 连接池中最小连接数量
        acquire: 30000,
        idle: 10000, // 如果一个线程 10 秒钟内没有被使用过的话，那么就释放线程
      },
      timezone: '+08:00', // 东八时区
    }),
  ],
})
export class DbModule {}
