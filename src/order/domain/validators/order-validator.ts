import { IsArray, IsDate, IsEnum, IsNotEmpty, ValidateNested } from 'class-validator';
import { OrderProperties, OrderStatus } from '../entities';
import { ClassValidatorFields } from '@/@seedwork';
import { User } from '@/user/domain/entities';
import { OrderItemRules } from './order-item.validator';
import { AddressRules } from './address.validator';


export class OrderRules {
  @IsNotEmpty()
  user: User;

  @IsEnum(OrderStatus)
  status: OrderStatus;

  @IsArray()
  @ValidateNested({ each: true })
  @IsNotEmpty()
  items: OrderItemRules[];

  @IsDate()
  updatedAt: Date;

  @IsDate()
  @IsNotEmpty()
  deliveryAddress: AddressRules;

  constructor({
    id,
    user,
    items,
    status,
    updatedAt,
    canceledAt,
    deliveredAt,
    deliveryAddress,
  }: OrderProperties) {
    Object.assign(this, {
      id,
      user,
      items,
      status,
      updatedAt,
      canceledAt,
      deliveredAt,
      deliveryAddress,
    });
  }
}

export class OrderValidator extends ClassValidatorFields<OrderRules> {
  validate(data: OrderProperties): boolean {
    return super.validate(new OrderRules(data ?? ({} as never)));
  }
}

export class OrderValidatorFactory {
  static create() {
    return new OrderValidator();
  }
}
