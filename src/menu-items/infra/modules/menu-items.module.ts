import { Module } from '@nestjs/common';
import { MenuItemsService } from '../gateways/menu-items.service';
import { MenuItemsResolver } from '../presentation/menu-items.resolver';

@Module({
  providers: [MenuItemsResolver, MenuItemsService]
})
export class MenuItemsModule {}
