import { OrderStatus } from '@/order/domain/entities';
import { ObjectType, Field, registerEnumType } from '@nestjs/graphql';

registerEnumType(OrderStatus, { name: 'Status' });

@ObjectType()
export class Address {
  @Field()
  city: string;

  @Field()
  street: string;

  @Field()
  state: string;

  @Field()
  zipCode: string;
}

@ObjectType()
export class OrderOutput {
  @Field()
  status: OrderStatus;

  @Field()
  customerId: string;

  @Field()
  customerAddress: Address;

  constructor(order: OrderOutput) {
    Object.assign(this, order);
  }
}
