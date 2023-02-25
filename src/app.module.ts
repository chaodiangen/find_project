import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Log4jsModule } from '@nestx-log4js/core';
import { DbModule } from './db/db.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { ProjectModule } from './modules/project/project.module';
import { EmailModule } from './modules/email/email.module';
import { MenuModule } from './modules/menu/menu.module';
import { DepartmentModule } from './modules/department/department.module';
import { RoleModule } from './modules/role/role.module';
import { GoodsModule } from './modules/goods/goods.module';
@Module({
  imports: [
    Log4jsModule.forRoot(),
    DbModule,
    UserModule,
    AuthModule,
    ProjectModule,
    EmailModule,
    MenuModule,
    DepartmentModule,
    RoleModule,
    GoodsModule,
  ],
  controllers: [AppController],
  providers: [AppService,],
})
export class AppModule {}
