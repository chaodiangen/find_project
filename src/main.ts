import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { logger } from './middleware/logger.middleware';
import * as express from 'express';

const listenPort = 3000;
const bootstrap = async () => {
  // const app = await NestFactory.create(AppModule);
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  /**
   * 接口文档
   */
  const config = new DocumentBuilder()
    .setTitle('接口文档')
    .setDescription('项目管理平台')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'jwt',
    )
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  //  使用log4框架打印日志
  app.use(logger);

  // 全局路由前缀
  // app.setGlobalPrefix('api');

  // 设置静态资源路径
  app.useStaticAssets(join(__dirname, '..', 'data'), {
    prefix: '/static/', //设置虚拟路径
  });
  await app.listen(listenPort);
};
bootstrap().then(() => {
  console.log(`listen in http://localhost:${listenPort}`);
});
