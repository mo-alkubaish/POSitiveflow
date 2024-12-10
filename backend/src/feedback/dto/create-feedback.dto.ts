import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsInt, IsNumber, IsString } from "class-validator";

export class CreateFeedbackDto {
    @ApiProperty(
        {description: 'The message of the feedback', example: 'The service was great!'}
    )
    @IsString()
    message: string;

    @ApiProperty(
        {description: 'The overall rating of the feedback', example: '5'}
    )
    @IsInt()
    @Transform(({ value }) => parseInt(value))
    overAllRating: number;

    @ApiProperty(
        {description: 'The quality of cashier rating of the feedback', example: '5'}
    )
    @IsInt()
    @Transform(({ value }) => parseInt(value))
    cashirRating: number;
}
