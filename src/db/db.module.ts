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
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'trs@admin',
      database: 'nest_export',
      models: allModels,
    }),
  ],
})
export class DbModule {}
