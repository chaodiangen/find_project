import { ApiProperty } from '@nestjs/swagger';
import { Column } from 'sequelize-typescript';
/*
  create-user.dto.ts
*/
export class User {
  @ApiProperty({
    type: String,
    description: '名字',
  })
  @Column
  readonly name: string;

  @ApiProperty()
  @Column
  readonly password: string;

  @ApiProperty()
  @Column
  readonly phone: string;

  @ApiProperty()
  @Column
  readonly avatar?: string;
}
