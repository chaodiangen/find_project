import { ApiProperty } from '@nestjs/swagger';
import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class User extends Model<User> {
  @ApiProperty({
    type: String,
    description: '名字',
  })
  @Column
  readonly name: string;

  @ApiProperty({
    type: String,
    description: '密码',
  })
  @Column
  readonly password: string;

  @ApiProperty({
    type: String,
    description: '手机号',
  })
  @Column
  readonly phone: string;

  @ApiProperty({
    type: String,
    description: '头像',
  })
  @Column
  readonly avatar?: string;
}
