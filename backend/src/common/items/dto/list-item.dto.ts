import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";
import { ListAllDto } from "src/dto/list-all.dto";

export class ListItemDto extends ListAllDto {

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    category: string
}