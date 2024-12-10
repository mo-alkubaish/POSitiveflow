import { IsString, IsEmail, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { FormatPhoneNumber } from 'src/format-phone-number/format-phone-number.decorator';

export class CreateSupplierDto {
    @ApiProperty({
        description: 'Name of the Supplier',
        example: 'Khalid Al-Sultan',
    })
    @IsString()
    name: string;

    @ApiProperty(
        {
            description: 'Email of the Supplier',
            example: 'khalid@example.com',
        }
    )
    @IsEmail()
    email: string;

    @ApiProperty(
        {
            description: 'Phone number of the Supplier',
            example: '(966) 512-345-678',
        }
    )
    @IsString()
    @FormatPhoneNumber()
    @Matches(/^\(966\) 5\d{2}-\d{4}-\d{2}$/, {
        message: (args) => `Phone number "${args.value}" is invalid. It should be in the format (966) 5xx-xxx-xxxx`,
    })
    phone: string;
}

