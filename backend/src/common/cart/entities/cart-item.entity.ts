import { BeforeCreate, BeforeUpdate, Embeddable, ManyToOne, Property } from "@mikro-orm/mongodb";
import { ApiProperty } from "@nestjs/swagger";
import { Item } from "src/common/items/entities/item.entity";

@Embeddable()
export class CartItem {
    @ManyToOne(() => Item)
    @ApiProperty({ description: 'The item in the cart', required: true })
    item: Item;

    @Property(
        {
            type: 'number',
            default: 1
        }
    )
    @ApiProperty({ description: 'The quantity of the item in the cart', required: true })
    quantity: number;



    @Property({ type: 'number' })
    @ApiProperty({ description: 'Total price for this item', required: true })
    itemTotal: number;

    @BeforeCreate()
    @BeforeUpdate()
    async calculateItemTotal() {
        this.itemTotal = this.item.price * this.quantity;
    }
}