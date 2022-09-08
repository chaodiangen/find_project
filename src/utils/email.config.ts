import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import { join } from 'path';

export default {
  transport: {
    host: 'smtp.163.com',
    port: 465,
    ignoreTLS: true,
    secure: true,
    auth: {
      user: 'chaodiangen@163.com',
      pass: 'SINMDEZNRIZNXYHX', // xxx是什么你懂的😀 SINMDEZNRIZNXYHX  ohfnlcdznjenjdjh
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
