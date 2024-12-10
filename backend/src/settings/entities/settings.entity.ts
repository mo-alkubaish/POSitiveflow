import { Entity, ObjectId, PrimaryKey, Property, SerializedPrimaryKey } from "@mikro-orm/mongodb";
import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsBoolean, IsInt, IsNumber, IsString, Matches } from "class-validator";

@Entity()
export class Settings {
    @PrimaryKey()
    _id: ObjectId;

    @SerializedPrimaryKey()
    id: string;
    
    @Property()
    @IsString()
    @ApiProperty({ description: 'Name of the store', example: 'My Store' })
    storeName: string;

    @Property()
    @IsString()
    @Transform(({ value }) => value.toUpperCase())
    @ApiProperty({ description: 'Currency of the store', example: 'SAR' })
    currency: string;

    @Property()
    @Transform(({ value }) => parseFloat(value))
    @IsNumber()
    @ApiProperty({ description: 'VAT rate of the store', example: 15 })
    vatRate: number;

    @Property()
    @Transform(({ value }) => parseInt(value))
    @IsInt()
    @ApiProperty({ description: 'Low stock alert threshold', example: 10 })
    lowStockAlert: number;

    @Property()
    @Transform(({ value }) => parseInt(value))
    @IsBoolean()
    @ApiProperty({ description: 'Enable WhatsApp notifications', example: true })
    isWhatsAppEnabled: boolean;

    @Property()
    @IsBoolean()
    @ApiProperty({ description: 'Enable loyalty program', example: true })
    isLoyaltyEnabled: boolean;

    @Property()
    @Matches(/^(\*|([0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9])|\*\/([0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9])) (\*|([0-9]|1[0-9]|2[0-3])|\*\/([0-9]|1[0-9]|2[0-3])) (\*|([1-9]|1[0-9]|2[0-9]|3[0-1])|\*\/([1-9]|1[0-9]|2[0-9]|3[0-1])) (\*|([1-9]|1[0-2])|\*\/([1-9]|1[0-2])) (\*|([0-6])|\*\/([0-6]))$/, {
        message: 'Invalid cron expression'
      })
    @ApiProperty({
        description: 'Backup frequency in cron expression format',
        example: '0 0 * * *', // Run at midnight every day
        default: '0 0 * * *'
    })
    backUpFrequency: string;

    @Property()
    @IsInt()
    @ApiProperty({ description: 'Backup retention period in days', example: 30 })
    retentionPeriod: number;

    
}
