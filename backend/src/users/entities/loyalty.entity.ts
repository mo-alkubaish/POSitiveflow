import { Entity, ObjectId, OneToOne, PrimaryKey, Property } from "@mikro-orm/mongodb";
import { User } from "./user.entity";

@Entity()
export class Loyalty {
    @PrimaryKey()
    _id: ObjectId;

    @Property()
    points: number;

    @OneToOne()
    customer: User
}