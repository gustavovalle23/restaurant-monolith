import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { MenuItemsService } from '../gateways/menu-items.service';
import { MenuItem } from '../../entities/menu-item.entity';
import { CreateMenuItemInput } from './dto/create-menu-item.input';
import { UpdateMenuItemInput } from './dto/update-menu-item.input';

@Resolver(() => MenuItem)
export class MenuItemsResolver {
  constructor(private readonly menuItemsService: MenuItemsService) {}

  @Mutation(() => MenuItem)
  createMenuItem(@Args('createMenuItemInput') createMenuItemInput: CreateMenuItemInput) {
    return this.menuItemsService.create(createMenuItemInput);
  }

  @Query(() => [MenuItem], { name: 'menuItems' })
  findAll() {
    return this.menuItemsService.findAll();
  }

  @Query(() => MenuItem, { name: 'menuItem' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.menuItemsService.findOne(id);
  }

  @Mutation(() => MenuItem)
  updateMenuItem(@Args('updateMenuItemInput') updateMenuItemInput: UpdateMenuItemInput) {
    return this.menuItemsService.update(updateMenuItemInput.id, updateMenuItemInput);
  }

  @Mutation(() => MenuItem)
  removeMenuItem(@Args('id', { type: () => Int }) id: number) {
    return this.menuItemsService.remove(id);
  }
}
