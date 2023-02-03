import { Status } from '@/order/domain/entities';
import { ObjectType, Field, registerEnumType } from '@nestjs/graphql';

registerEnumType(Status, { name: 'Status' });

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
  status: Status;

  @Field()
  customerId: string;

  @Field()
  customerAddress: Address;

  constructor(order: OrderOutput) {
    Object.assign(this, order);
  }
}
