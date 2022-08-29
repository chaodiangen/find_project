import { ApiProperty } from '@nestjs/swagger';
import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class Project extends Model<Project> {
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
    example: '1',
    description: '创建者',
  })
  @Column
  readonly userId?: string;
}
