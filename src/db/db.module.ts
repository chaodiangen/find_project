import { Module } from '@nestjs/common';
import { User } from 'src/modules/user/entities/user.entity';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456',
      database: 'nest_export',
      models: [User],
    }),
  ],
})
export class DbModule {}
