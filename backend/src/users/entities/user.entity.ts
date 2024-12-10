import { Entity, PrimaryKey, Property, SerializedPrimaryKey, BeforeCreate } from '@mikro-orm/core';
import { ObjectId } from '@mikro-orm/mongodb';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';

import { Role } from '../enums/role.enum';
import { IsEmail, IsEnum, IsOptional, IsString, Matches } from 'class-validator';
import { FormatPhoneNumber } from 'src/format-phone-number/format-phone-number.decorator';

@Entity()
export class User {
  @PrimaryKey()
  _id: ObjectId;


  @SerializedPrimaryKey()
  @ApiProperty()
  id!: string;

  @Property()
  @ApiProperty()
  name: string;

  @Property({ unique: true })
  @ApiPropertyOptional()
  @IsOptional()
  email?: string;

  @Property({ unique: true })
  @ApiPropertyOptional()
  @IsOptional()
  @FormatPhoneNumber()
  @Matches(/^\(966\) 5\d{2}-\d{4}-\d{2}$/, {
    message: (args) => `Phone number "${args.value}" is invalid. It should be in the format (966) 5xx-xxx-xxxx`,
  })
  phone?: string;

  @Property()
  @ApiProperty()
  @IsEnum(Role, {
    message: `Role must be one of these values: ${Object.values(Role).join(', ')}`,
  })
  role: Role;

  @Property()
  @ApiProperty()
  password: string;

  @BeforeCreate()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  async validatePassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
  }
}
