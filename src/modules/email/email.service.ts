import { Injectable, Logger } from '@nestjs/common';
import { ISendMailOptions, MailerService } from '@nestjs-modules/mailer';
import { IResponse } from 'src/interface/response.interface';

@Injectable()
//
export class EmailService {
  private responese: IResponse;
  constructor(private readonly mailerService: MailerService) {}
  async sendEmail(data) {
    try {
      const code = Math.random().toString().slice(-6);
      const date = new Date();
      const sendMailOptions: ISendMailOptions = {
        to: data,
        subject: '用户邮箱验证',
        template: 'validate.code.ejs', //这里写你的模板名称，如果你的模板名称的单名如 validate.ejs ,直接写validate即可 系统会自动追加模板的后缀名,如果是多个，那就最好写全。
        //内容部分都是自定义的
        context: {
          code, //验证码
          date, //日期
          sign: '系统邮件,回复无效。', //发送的签名,当然也可以不要
        },
      };
      this.mailerService
        .sendMail(sendMailOptions)
        .then(() => {
          console.log(
            `发送邮件给:${data.email},成功!主题:${data.subject || '默认'}`,
          );
        })
        .catch((error) => {
          console.log(
            `发送邮件给:${data.email}出错!主题:${data.subject || '默认'}`,
            error,
          );
        });

      return (this.responese = {
        code: 0,
        data: '发送成功',
      });
    } catch (error) {
      Logger.error('发送邮件出错:', error);
      return (this.responese = {
        code: 0,
        data: error,
      });
    }
  }
}
