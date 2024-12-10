import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsEnum, IsOptional, IsString,  Matches,  MaxLength } from 'class-validator';
import { FormatPhoneNumber } from 'src/format-phone-number/format-phone-number.decorator';
import { Role } from 'src/users/enums/role.enum';

export class CreateUserDto {

    @ApiProperty(
        {
            example: 'John Doe',
            description: 'The name of the User',
            required: true,
        }
    )
    @IsString()
    @MaxLength(255)
    name: string;
    
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
        message: (args) => `Phone number "${args.value}" is invalid. It should be in the format (966) 5xx-xxx-xxxx`,
    })
    @IsOptional()
    phone?: string;

    @ApiProperty(
        {
            example: 'admin',
            description: 'The role of the User',
            required: true,
            enum: Role
        }
    )
    @Transform(({ value }) => {
        if (typeof value === 'string') {
            const formattedValue = value.toLowerCase();
            return Role[formattedValue.charAt(0).toUpperCase() + formattedValue.slice(1)];
        }
        return value;
    })
    @IsEnum(Role, {
        message: 'Role must be one of: ' + Object.values(Role).join(', ')
    })
    role: Role ;


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
