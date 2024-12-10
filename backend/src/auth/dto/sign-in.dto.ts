import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString,  Matches, MaxLength } from 'class-validator';
import { Transform } from 'class-transformer';
import { ExactlyOne } from '../validators/exactly-one.validator';
import { FormatPhoneNumber } from 'src/format-phone-number/format-phone-number.decorator';

@ExactlyOne(['email', 'phone'])
export class SignInDto {
    @ApiProperty(
        {
            example: 'john@example.com',
            description: 'The email of the User',
            required: false,
        }
    )
    @IsString()
    @IsEmail()
    @IsOptional()
    email?: string;
    @ApiProperty(
        {
            example: '966501234567',
            description: 'The phone of the User',
            required: false,
        }
    )
    @IsString()
    @FormatPhoneNumber()
    @Matches(/^\(966\) 5\d{2}-\d{4}-\d{2}$/, {
        message: (args) => `Phone number ${args.value} is invalid. It should be in the format (966) 5xx-xxx-xxxx`,
    })
    @IsOptional()
    phone?: string;

    @ApiProperty(
        {
            example: 'changeme',
            description: 'The password of the User',
            required: true,
        }
    )
    @IsString()
    password: string;
}