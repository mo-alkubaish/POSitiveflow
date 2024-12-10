import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsEnum, IsString } from "class-validator";
import { DiscountType } from "../enums/discount-type.enum";
import { Transform } from "class-transformer";

export class CreateDiscountDto {
    @ApiProperty({ description: 'Name of the discount', example: 'Summer Sale' })
    @IsString()
    name: string;
    @ApiProperty({ description: 'Type of the discount' , example: 'Percentage' })
    @Transform(({ value }) => value.charAt(0).toUpperCase() + value.slice(1).toLowerCase())
    @IsEnum(DiscountType)
    type: DiscountType;
    @ApiProperty({ description: 'Value of the discount' , example: 10 })
    value: number;
    @ApiProperty({ description: 'Start date of the discount' , example: new Date().toISOString()})
    @Transform(({ value }) => new Date(value))
    @IsDate()
    startDate: Date;
    @ApiProperty({ description: 'End date of the discount', example:  new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()})
    @Transform(({ value }) => new Date(value))
    endDate: Date;
}
