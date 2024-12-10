import { Entity, ObjectId, PrimaryKey, Property, SerializedPrimaryKey } from "@mikro-orm/mongodb";
import { DiscountType } from "../enums/discount-type.enum";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class Discount {
    @PrimaryKey()
    _id: ObjectId;
    @ApiProperty(
        { description: 'ID of the discount' }
    )
    @SerializedPrimaryKey()
    id: string;
    @ApiProperty(
        { description: 'Name of the discount' }
    )
    @Property()
    name: string;
    @ApiProperty(
        { description: 'Type of the discount' }
    )
    @Property()
    type: DiscountType;
    @ApiProperty(
        { description: 'Value of the discount' }
    )
    @Property()
    value: number;
    @ApiProperty(
        { description: 'Start date of the discount' }
    )
    @Property()
    startDate: Date;
    @ApiProperty(
        { description: 'End date of the discount' }
    )
    @Property()
    endDate: Date;
    @Property({ onUpdate: () => new Date() })
    @ApiProperty({ description: 'Last modification timestamp' })
    lastEdited: Date = new Date();

    @Property({ persist: false })
    @ApiProperty({ description: 'Status of the discount' })
    get getStatus(): string {
        const now = new Date();
        if (now < this.startDate) return 'Scheduled';
        if (now > this.endDate) return 'Ended';
        return 'Active';
    }
}
