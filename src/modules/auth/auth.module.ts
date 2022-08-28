import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/modules/user/user.module';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/modules/user/entities/user.entity';
import { HashPasswordMiddleware } from 'src/middleware/hash-password.middleware';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/guards/auth.guard';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './jwt.constant';
import { JwtStrategy } from './jwt.strategy';

@Module({
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    JwtStrategy,
  ],
  controllers: [AuthController],
  imports: [
    UserModule,
    SequelizeModule.forFeature([User]),
    JwtModule.register({
      secret: jwtConstants.secret,
    }),
  ],
})
export class AuthModule implements NestModule {
  // 使用中间件进行密码加密
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(HashPasswordMiddleware)
      .forRoutes('auth/register')
      .apply(HashPasswordMiddleware)
      .forRoutes('auth/update');
  }
}
