import { ApiProperty } from '@nestjs/swagger';
import { Column, Model, Table } from 'sequelize-typescript';

@Table({
  tableName: 'menu',
})
export class Menu extends Model<Menu> {
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
    description: '图标',
  })
  @Column
  readonly icon: string;
  @ApiProperty({
    type: Number,
    example: '1',
    description: '排序',
  })
  @Column
  readonly sort: number;
  @ApiProperty({
    type: Number,
    example: '1',
    description: '一级、二级菜单',
  })
  @Column
  readonly type: number;
  @ApiProperty({
    type: String,
    example: '',
    description: '路由',
  })
  @Column
  readonly url: string;
  @ApiProperty({
    type: Number,
    example: '1',
    description: '父级菜单',
  })
  @Column
  readonly parent_id: number;
}
