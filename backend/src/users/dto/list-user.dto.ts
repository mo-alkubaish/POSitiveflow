import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsBoolean, IsOptional, IsString } from "class-validator";
import { ListAllDto } from "src/dto/list-all.dto";

export class ListUsersDto extends ListAllDto {
    @ApiProperty({ required: true, example: true })
    @IsBoolean()
    isCustomers: boolean;
}