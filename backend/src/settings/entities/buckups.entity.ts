import { ObjectId, Entity, PrimaryKey, SerializedPrimaryKey, Property } from "@mikro-orm/mongodb";

@Entity()
export class Buckups {
    @PrimaryKey()
    _id: ObjectId
    
    @SerializedPrimaryKey()
    id: string

    @Property()
    Date: Date

    @Property()
    size: string

    @Property()
    status: string

    @Property()
    location: string

    @Property({persist: false})
    get time() {
        return this.Date.toLocaleTimeString()
    }
}