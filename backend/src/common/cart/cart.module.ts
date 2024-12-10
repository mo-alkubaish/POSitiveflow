import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { ItemsModule } from '../items/items.module';
import { DiscountModule } from '../discount/discount.module';

@Module({
  imports: [ItemsModule, DiscountModule],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
