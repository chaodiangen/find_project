import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import { join } from 'path';

export default {
  transport: {
    host: 'smtp.qq.com',
    port: 465,
    ignoreTLS: true,
    secure: false,
    auth: {
      user: '1113969983@qq.com',
      pass: 'ohfnlcdznjenjdjh', // xxx是什么你懂的😀
    },
  },
  defaults: {
    from: '"名字" <1113969983@qq.com>',
  },
  preview: false,
  template: {
    dir: join(__dirname, 'src/template/email'),
    adapter: new PugAdapter(), // or new PugAdapter() or new EjsAdapter()
    options: {
      strict: true,
    },
  },
};

/**  registerAs('email', () => ({
  transport: {
    host: 'smtp.example.com',
    port: 25,
    ignoreTLS: true,
    secure: false,
    auth: {
      user: 'chaodiangen@163.com',
      pass: 'vue123456', // xxx是什么你懂的😀
    },
  },
  defaults: {
    from: '"nest-modules" <modules@nestjs.com>',
  },
  template: {
    // 这里注意一下路径, 不然加载的路径是错误的
    dir: join(__dirname, 'src/template/email'),
    adapter: new PugAdapter(),
    options: {
      strict: true,
    },
  },
}));
*/
