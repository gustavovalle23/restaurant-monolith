import { Injectable } from '@nestjs/common';
import { CreateMenuItemInput } from '../presentation/dto/create-menu-item.input';
import { UpdateMenuItemInput } from '../presentation/dto/update-menu-item.input';

@Injectable()
export class MenuItemsService {
  create(createMenuItemInput: CreateMenuItemInput) {
    return 'This action adds a new menuItem';
  }

  findAll() {
    return `This action returns all menuItems`;
  }

  findOne(id: number) {
    return `This action returns a #${id} menuItem`;
  }

  update(id: number, updateMenuItemInput: UpdateMenuItemInput) {
    return `This action updates a #${id} menuItem`;
  }

  remove(id: number) {
    return `This action removes a #${id} menuItem`;
  }
}
