import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsArray, IsOptional, IsString, ValidateNested } from "class-validator";
import { CartItem } from "../entities/cart-item.entity";
import { Type } from "class-transformer";


export class UpdateCartDto {
    @ApiPropertyOptional(
        {
            type: String,
            description: 'Customer ID', 
            example: '1234567890'
        }
    )
    @IsOptional()
    @IsString()
    customerId: string;

    @ApiPropertyOptional({ 
        type: [CartItem],
        description: 'Array of items in cart', 
        example: [{ itemID: '1234567890', quantity: 2 }]
      })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CartItem)
    items: CartItem[];
}
