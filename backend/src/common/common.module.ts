import { Global, Module } from '@nestjs/common';
import { ItemsModule } from './items/items.module';
import { CartModule } from './cart/cart.module';
import { DiscountModule } from './discount/discount.module';
import { AuthModule } from 'src/auth/auth.module';
import { SettingsModule } from 'src/settings/settings.module';

@Global()
@Module({
    imports: [ItemsModule, CartModule, DiscountModule, AuthModule, SettingsModule],
    exports: [AuthModule, SettingsModule, ItemsModule, CartModule, DiscountModule]
})
export class CommonModule {
    exports: [
        CommonModule
    ];
}
