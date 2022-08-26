import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserController } from './user.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { HashPasswordMiddleware } from 'src/middleware/hash-password.middleware';

@Module({
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
  imports: [SequelizeModule.forFeature([User])],
})
export class UserModule implements NestModule {
  // 使用中间件进行密码加密
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HashPasswordMiddleware).forRoutes('user');
  }
}
