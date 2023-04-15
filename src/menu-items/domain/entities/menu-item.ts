import { Entity, UniqueEntityId } from '@/@seedwork';

class Category {
  readonly id: string;
  readonly name: string;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }
}

type MenuItemProperties = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  available: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export class MenuItem extends Entity<MenuItemProperties> {
  constructor(props: MenuItemProperties, id?: UniqueEntityId) {
    super(props, id);
  }

  get isAvailable(): boolean {
    return this.props.available;
  }

  setAvailable(available: boolean): void {
    this.props.available = available;
    this.props.updatedAt = new Date();
  }

  updatePrice(price: number): void {
    this.props.price = price;
    this.props.updatedAt = new Date();
  }
}
