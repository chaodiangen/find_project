import { ApiProperty } from '@nestjs/swagger';
import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class User extends Model<User> {
  @ApiProperty({
    type: String,
    example: 'name',
    description: '名字',
  })
  @Column
  readonly name: string;

  @ApiProperty({
    type: String,
    example: 'password',
    description: '密码',
  })
  @Column
  readonly password: string;

  @ApiProperty({
    type: String,
    example: 'phone',
    description: '手机号',
  })
  @Column
  readonly phone: string;

  @ApiProperty({
    type: String,
    example: 'avatar',
    description: '头像',
  })
  @Column
  readonly avatar?: string;

  @Column
  readonly salt?: string;
}
