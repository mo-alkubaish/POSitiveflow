import { Entity, Property, PrimaryKey, ObjectId, SerializedPrimaryKey } from '@mikro-orm/mongodb';
@Entity()
export class Supplier {
    @PrimaryKey()
    _id: ObjectId;

    @SerializedPrimaryKey()
    id!: string;

    @Property()
    name: string;

    @Property()
    email: string;

    @Property()
    phone: string;
}
