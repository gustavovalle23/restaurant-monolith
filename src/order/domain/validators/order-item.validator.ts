import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';
import { ClassValidatorFields } from '@/@seedwork';
import { OrderItemProperties } from '../entities';

export class OrderItemRules {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  observation: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsNumber()
  @Min(1)
  quantity: number;

  constructor({ name, observation, price, quantity }: OrderItemProperties) {
    Object.assign(this, {
      name,
      observation,
      price,
      quantity,
    });
  }
}

export class OrderItemValidator extends ClassValidatorFields<OrderItemRules> {
  validate(data: OrderItemProperties): boolean {
    return super.validate(new OrderItemRules(data ?? ({} as never)));
  }
}

export class OrderItemValidatorFactory {
  static create() {
    return new OrderItemValidator();
  }
}
