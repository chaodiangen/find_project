import { ApiProperty } from '@nestjs/swagger';
import { Column, Model, Table } from 'sequelize-typescript';

@Table({
  tableName: 'users',
})
export class User extends Model<User> {
  @ApiProperty({
    type: String,
    example: '张三',
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
    example: '13811111111',
    description: '手机号',
  })
  @Column
  readonly phone: string;

  @ApiProperty({
    type: String,
    example:
      'https://img.alicdn.com/imgextra/i1/O1CN01eWC5Jr1QTy6uEyeaj_!!6000000001978-2-tps-196-196.png_50x50q90.jpg',
    description: '头像',
  })
  @Column
  readonly avatar?: string;
  @ApiProperty({
    type: Number,
    example: 3,
    description: '用户角色 1 管理员 2 vip 3 普通用户',
  })
  @Column
  readonly role: number;

  @Column
  readonly salt?: string;
}
