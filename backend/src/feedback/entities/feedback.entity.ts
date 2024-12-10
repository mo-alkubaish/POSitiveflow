import { Entity, ManyToOne, ObjectId, PrimaryKey, Property, SerializedPrimaryKey } from "@mikro-orm/mongodb";
import { Cart } from "src/common/cart/entities/cart.entity";
import { User } from "src/users/entities/user.entity";

@Entity()
export class Feedback {
    @PrimaryKey()
    _id: ObjectId;

    @SerializedPrimaryKey()
    id: string;

    @ManyToOne()
    customer: User;

    @ManyToOne()
    order: Cart;

    @Property()
    message: string;

    @Property()
    overAllRating: number;

    @Property()
    cashirRating: number;
}
