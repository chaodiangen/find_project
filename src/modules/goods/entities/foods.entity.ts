import { ApiProperty } from '@nestjs/swagger';
import { Column, Model, Table } from 'sequelize-typescript';

@Table({
  tableName: 'goods',
})
export class Goods extends Model<Goods> {
  @ApiProperty({
    type: String,
    example: '南京项目',
    description: '项目名字',
  })
  @Column
  readonly name: string;
  @ApiProperty({
    type: String,
    example: '我是项目简介',
    description: '项目简介',
  })
  @Column
  readonly description: string;
  @ApiProperty({
    type: String,
    example: '项目地址',
    description: '项目地址',
  })
  @Column
  readonly address: string;
  @ApiProperty({
    type: String,
    example: 1,
    description: '选择项目负责人',
  })
  @Column
  readonly userId?: number;
  // 0 暂未开始 1  开始中 2 延期 3 结束
  @Column
  readonly status: number;
  // 项目经理
  @Column
  identity: string;
}
