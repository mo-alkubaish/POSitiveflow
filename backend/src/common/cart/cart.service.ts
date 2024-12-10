import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UpdateCartDto } from './dto/update-cart.dto';
import { EntityManager } from '@mikro-orm/mongodb';
import { DiscountService } from '../discount/discount.service';
import { ItemsService } from '../items/items.service';
import { Cart } from './entities/cart.entity';
import { User } from 'src/users/entities/user.entity';
import { CartStatus } from './Enums/cart-status.enum';
import { Loyalty } from 'src/users/entities/loyalty.entity';
import { Discount } from '../discount/entities/discount.entity';

@Injectable()
export class CartService {
  constructor(
    private readonly itemsService: ItemsService,
    private readonly discountService: DiscountService,
    private readonly em: EntityManager, 
  ) {}
  async create(cashierID: string) {

    const cashier = await this.em.findOneOrFail<User>('User', cashierID);
    if ( cashier.role !== 'cashier') {
      throw new ConflictException('User is not a cashier');
    }
    const cart: Cart =  this.em.create<Cart>('Cart', { cashier, status: CartStatus.Draft });
    await this.em.persistAndFlush(cart);

    return cart;
  }


  async findOne(id: string) {
    return await this.em.findOneOrFail<Cart>('Cart', id);
  }


  async update(id: string, updateCartDto: UpdateCartDto) {
    const cart = await this.em.findOneOrFail<Cart>('Cart', id);
    if (updateCartDto.customerId) {
      const customer =await this.em.findOneOrFail<User>('User', updateCartDto.customerId);
      if (customer.role !== 'customer') {
        throw new ConflictException('User is not a customer');
      }
      cart.customer = customer;
    }
    if (updateCartDto.items) {
      cart.items = updateCartDto.items;
    }
    await this.em.persistAndFlush(cart);

    return {message: 'Cart updated successfully'};
  }

  async remove(id: string) {
    const cart = await this.em.findOneOrFail<Cart>(Cart, { id });
    this.em.remove(cart);
    await this.em.flush();
    return  `Cart #${id} removed successfully`;
  }

  async getDrafts(id: string) {
    const cashier = await this.em.findOneOrFail<User>('User', id);
    const carts = await this.em.find<Cart>('Cart', { status: CartStatus.Draft, cashier });
    if (carts.length === 0) {
      // create a new cart
      const cart =  await this.create(id);
      return [cart];
    }
    return carts;
  }

  async getPending(id: string) {
    const cashier = await this.em.findOneOrFail<User>('User', id);
    return await this.em.find<Cart>('Cart', { status: CartStatus.Paid, cashier });
  }

  async getMyOrders(id: string) {
    const customer = await this.em.findOneOrFail<User>('User', id);
    return await this.em.find<Cart>('Cart', { status: { $in: [CartStatus.Paid, CartStatus.Confirmed] }, customer },       { 
      limit: 10,
      orderBy: { createdAt: 'DESC' }
    });
  }
  
  async applyDiscount(discountId: string, cartId: string) {
    const discount = await this.em.findOneOrFail<Discount>('Discount', { id: discountId, endDate: { $gte: new Date() }, startDate: { $lte: new Date() } });
    const cart = await this.em.findOneOrFail<Cart>('Cart', { id: cartId });
    if (cart.status !== CartStatus.Draft) {
      throw new ConflictException('Cart is not a draft');
    }
    if (cart.discounts.contains(discount)) {
      throw new ConflictException('Discount already applied');
    }
    cart.addDiscount(discount);
    await this.em.persistAndFlush(cart);
    return { message: 'Discount applied successfully' };
  }

  async removeDiscount(discountId: string, cartId: string) {
    const discount = await this.em.findOneOrFail<Discount>('Discount', { id: discountId });
    const cart = await this.em.findOneOrFail<Cart>('Cart', { id: cartId });
    if (cart.status !== CartStatus.Draft) {
      throw new ConflictException('Cart is not a draft');
    }
    if (!cart.discounts.contains(discount)) {
      throw new ConflictException('Discount not applied');
    }
    cart.removeDiscount(discount);
    await this.em.persistAndFlush(cart);
    return { message: 'Discount removed successfully' };
  }

  async getDiscounts(cartId: string) {
    const cart = await this.em.findOneOrFail<Cart>('Cart', { id: cartId });
    return cart.discounts.getItems();
  }

  async getDiscountsTotal(cartId: string) {
    const cart = await this.em.findOneOrFail<Cart>('Cart', { id: cartId });
    return cart.totalDiscountAmount;
  }

  async applyLoyaltyPoints(cartId: string, points: number) {
    const cart = await this.em.findOneOrFail<Cart>('Cart', { id: cartId });
    const loyaltyPoints = await this.em.findOne<Loyalty>('Loyalty', { customer: cart.customer });
    if (loyaltyPoints.points < points) {
      throw new ConflictException('Insufficient loyalty points');
    }
    if (cart.status !== CartStatus.Draft) {
      throw new ConflictException('Cart is not a draft');
    }
    cart.pointUsed = points;
    await this.em.persistAndFlush(cart);
    return { message: 'Loyalty points applied successfully' };
  }

  async checkout(id: string, cashierID: string) {
    const cart = await this.em.findOneOrFail<Cart>('Cart', {id});
    if (cart.status !== CartStatus.Draft) {
      throw new ConflictException('Cart is not a draft');
    }
    if (cart.cashier.id !== cashierID) {
      throw new UnauthorizedException('Cart does not belong to cashier');
    }
    cart.status = CartStatus.Paid;
    for (const CartItem of cart.items) {
      CartItem.item.stock -= CartItem.quantity
      await this.em.persistAndFlush(CartItem.item);
    }
    
    const loyaltyPoints = await this.em.findOne<Loyalty>('Loyalty', { customer: cart.customer });
    if (loyaltyPoints) {
      // add loyalty points
      loyaltyPoints.points += cart.pointUsed;
      // deduct used loyalty points
      loyaltyPoints.points -= cart.pointUsed;
      await this.em.persistAndFlush(loyaltyPoints);
    }
    await this.em.persistAndFlush(cart);
    return { message: 'Payment successful' };
  }

  async getSummary() {
    const result = await this.em.aggregate('Cart', [
        // Match only confirmed carts
        { $match: { status: CartStatus.Confirmed } },
        
        // Unwind items array
        { $unwind: '$items' },
        
        // Group by product
        { 
            $group: {
                _id: '$items.product',
                totalSales: { $sum: { $multiply: ['$items.price', '$items.quantity'] } },
                totalQuantity: { $sum: '$items.quantity' },
                productName: { $first: '$items.product.name' }
            }
        },
        
        // Sort by total sales descending
        { $sort: { totalSales: -1 } },
        
        // Limit to top 10
        { $limit: 10 },
        
        // Format the output
        {
            $project: {
                _id: 0,
                productId: '$_id',
                productName: 1,
                totalSales: 1,
                totalQuantity: 1
            }
        }
    ]);

    // Calculate grand total
    const totalResult = await this.em.aggregate('Cart', [
        { $match: { status: CartStatus.Confirmed } },
        { $unwind: '$items' },
        {
            $group: {
                _id: null,
                total: { $sum: { $multiply: ['$items.price', '$items.quantity'] } }
            }
        }
    ]);

    return {
        totalSales: totalResult[0]?.total || 0,
        topProducts: result
    };
}
  
}
