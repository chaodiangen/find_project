import { ApiProperty } from '@nestjs/swagger';
import { Column, Model, Table } from 'sequelize-typescript';

@Table({
  tableName: 'department',
})
export class Department extends Model<Department> {
  @ApiProperty({
    type: String,
    example: '',
    description: '名称',
  })
  @Column
  readonly name: string;
}
