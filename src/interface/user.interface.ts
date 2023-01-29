import { ApiProperty } from '@nestjs/swagger';
import { Column, Model, Table } from 'sequelize-typescript';
export class login extends Model {
  @ApiProperty({
    type: String,
    example: 'lisi',
    description: '名字',
  })
  @Column
  readonly name: string;

  @ApiProperty({
    type: String,
    example: '123456',
    description: '密码',
  })
  @Column
  readonly password: string;
  @ApiProperty({
    type: String,
    example: '13911111111',
    description: '手机号',
  })
  @Column
  readonly phone: string;
  @ApiProperty({
    type: String,
    example: '',
    description: '验证码',
  })
  @Column
  readonly captcha: string;
}
export class updateUser extends Model {
  @ApiProperty({
    type: String,
    example: '13911111111',
    description: '手机号',
  })
  @Column
  readonly phone: string;
  @ApiProperty({
    type: String,
    example: '123456',
    description: '密码',
  })
  @Column
  readonly oldPassword: string;
  @ApiProperty({
    type: String,
    example: '123123',
    description: '新密码',
  })
  @Column
  readonly password: string;
}
@Table
export class userPagination extends Model{
  @ApiProperty({
    type: String,
    example: '张三',
    description: '搜索名字',
  })
  @Column
  readonly name?: string;
  @ApiProperty({
    type: Number,
    example: 1,
    description: '第几页',
  })
  @Column
  readonly pageNum: number;
  @ApiProperty({
    type: Number,
    example: 10,
    description: '每页多少条数据',
  })
  @Column
  readonly pageSize?: number;
}
