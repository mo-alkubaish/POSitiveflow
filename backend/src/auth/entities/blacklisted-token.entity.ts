import { Entity, ObjectId, PrimaryKey, Property} from '@mikro-orm/mongodb';

@Entity()
export class BlacklistedToken {
  @PrimaryKey()
  _id: ObjectId;


  @Property({index: true})
  token: string;


  @Property()
  expiresAt: Date;
}