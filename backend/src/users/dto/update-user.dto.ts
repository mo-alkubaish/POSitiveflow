import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsEnum, IsOptional, IsString,  Matches,  MaxLength } from 'class-validator';
import { FormatPhoneNumber } from 'src/format-phone-number/format-phone-number.decorator';
import { Role } from 'src/users/enums/role.enum';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
}
