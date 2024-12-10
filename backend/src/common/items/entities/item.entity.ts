import { Entity, Property, PrimaryKey, ObjectId, SerializedPrimaryKey } from '@mikro-orm/mongodb';
import {ApiProperty, ApiPropertyOptional} from '@nestjs/swagger';
@Entity()
export class Item {
    @PrimaryKey()
    _id: ObjectId;

    @SerializedPrimaryKey()
    @ApiProperty()
    id!: string;

    @Property()
    @ApiProperty()
    name: string;
    @Property({ unique: true })
    @ApiProperty()
    SKU: string;
    @Property()
    @ApiProperty()
    price: number;
    @Property()
    @ApiProperty()
    category: string;
    @Property()
    @ApiProperty()
    stock: number;
    @Property({ nullable: true })
    @ApiPropertyOptional()
    image?: String | null;

    @Property({ onUpdate: () => new Date() })
    @ApiProperty({ description: 'Last modification timestamp' })
    lastEdited: Date = new Date();
}
