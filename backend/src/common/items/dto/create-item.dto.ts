import { ApiProperty,ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString, IsNumber, IsOptional, Min } from 'class-validator';
export class CreateItemDto {
    @ApiProperty(
        {
            description: 'Name of the item',
            example: 'Basbousa',
        }
    )
    @IsString()
    name: string;
    @ApiProperty(
        {
            description: 'SKU of the item',
            example: 'SKU001',
        }
    )
    @IsString()
    SKU: string;
    @ApiProperty(
        {
            description: 'Price of the item',
            example: 10.99,
        }
    )
    @IsNumber()
    @Transform(({ value }) => parseFloat(value))
    @Min(0)
    price: number;
    @ApiProperty(
        {
            description: 'Category of the item',
            example: 'Desserts',
        }
    )
    @IsString()
    category: string;
    @ApiProperty(
        {
            description: 'Stock of the item',
            example: 100,
        }
    )
    @IsNumber()
    @Transform(({ value }) => parseInt(value))
    @Min(0)
    stock: number;
    @ApiPropertyOptional(
        {
            description: 'Image of the item in base64 format',
        }
    )
    @IsString()
    @IsOptional()
    image?: string;
}