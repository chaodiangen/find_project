import { ApiProperty } from '@nestjs/swagger';
import { Column, Model, Table } from 'sequelize-typescript';

@Table({
  tableName: 'role',
})
export class Role extends Model<Role> {
  @ApiProperty({
    type: String,
    example: '',
    description: '名称',
  })
  @Column
  readonly name: string;
  @ApiProperty({
    type: String,
    example: '',
    description: '详情',
  })
  @Column
  readonly desc: string;
  @ApiProperty({
    type: String,
    example: '',
    description: '权限',
  })
  @Column
  readonly permissions: string;
}
