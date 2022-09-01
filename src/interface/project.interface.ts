import { ApiProperty } from '@nestjs/swagger';
import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class ProjectPagination extends Model<ProjectPagination> {
  @ApiProperty({
    type: String,
    example: '南京项目',
    description: '搜索名字',
  })
  @Column
  readonly name?: string;

  @ApiProperty({
    type: String,
    example: '1',
    description: '第几页',
  })
  @Column
  readonly pageNum: number;
  @ApiProperty({
    type: String,
    example: '10',
    description: '每页多少条数据',
  })
  @Column
  readonly pageSize?: number;
}
