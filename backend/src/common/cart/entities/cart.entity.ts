import { BeforeCreate, BeforeUpdate, Collection, Embedded, Entity, ManyToMany, ManyToOne, ObjectId, OneToMany, PrimaryKey, Property, SerializedPrimaryKey } from "@mikro-orm/mongodb";
import { CartStatus } from "../Enums/cart-status.enum";
import { CartItem } from "./cart-item.entity";
import { Discount } from "src/common/discount/entities/discount.entity";
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsArray, ValidateNested, IsEnum } from 'class-validator';
import { User } from "src/users/entities/user.entity";
import { SettingsService } from "src/settings/settings.service";

@Entity()
export class Cart {
    @PrimaryKey()
    _id: ObjectId;

    @SerializedPrimaryKey()
    @ApiProperty({ description: 'Cart ID' })
    id: string;


    @ManyToOne({
        entity: () => User,
        nullable: true,
        updateRule: 'cascade',
        deleteRule: 'set null',

    })
    @ApiProperty({ 
        description: 'The customer associated with the cart', 
        required: false 
    })
    customer?: User;

    @ManyToOne({
        entity: () => User,
        nullable: true,
        eager: false,
        mapToPk: false,
        updateRule: 'cascade',
        deleteRule: 'set null',
    })
    @ApiProperty({ 
        description: 'The cashier associated with the cart', 
        required: true 
    })
    cashier: User;

    @Property()
    @ApiProperty({ description: 'The status of the cart', required: true })
    @IsEnum(CartStatus, 
        { 
            message: `Status must be one of these values: ${Object.values(CartStatus).join(', ')}`
        }
    )
    status: CartStatus;

    @ApiProperty({ 
        description: 'Array of items in cart', 
        required: false,
        type: [CartItem] 
    })
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Embedded(() => CartItem, { array: true })
    items: CartItem[];

    @ManyToMany(() => Discount)
    discounts = new Collection<Discount>(this);

    @Property()
    @ApiProperty({
        description: 'Total loyalty points used in the cart',
        required: false
    })
    pointUsed: number;


    @Property()
    createdAt: Date = new Date();

    @Property({ onUpdate: () => new Date() })
    updatedAt: Date = new Date();

    async addDiscount(discount: Discount) {
        this.discounts.add(discount);
    }

    async removeDiscount(discount: Discount) {
        this.discounts.remove(discount);
    }
    @Property()
    @ApiProperty({ description: 'Total value of items in cart' })
    itemsTotal: number = 0;

    @Property()
    @ApiProperty({ description: 'Total discount amount' })
    totalDiscountAmount: number = 0;

    @Property()
    @ApiProperty({ description: 'VAT amount' })
    vatAmount: number = 0;

    @Property()
    @ApiProperty({ description: 'Final total after discounts and VAT' })
    total: number = 0;

    @BeforeCreate()
    @BeforeUpdate()
    async calculateTotals() {
        // Calculate items total
        this.itemsTotal = this.items.reduce((sum, item) => 
            sum + (item.quantity * item.item.price), 0);

        // Calculate discount
        let priceAfterDiscount = this.itemsTotal;
        for (const discount of this.discounts) {
            if (discount.type === 'percentage') {
                priceAfterDiscount -= priceAfterDiscount * discount.value / 100;
            } else if (discount.type === 'fixed') {
                priceAfterDiscount -= discount.value;
            }
        }
        this.totalDiscountAmount = this.itemsTotal - priceAfterDiscount + (this.pointUsed || 0) / 1000;
        const settings = await SettingsService.getSettingsStatic();
        const vatRate = settings.vatRate;
        this.vatAmount = (this.itemsTotal - this.totalDiscountAmount) * vatRate;

        // Calculate final total
        this.total = this.itemsTotal - this.totalDiscountAmount + this.vatAmount;
    }

}
