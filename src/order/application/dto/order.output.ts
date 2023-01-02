import { Status } from '../../domain/entities/order.entity';
import { ObjectType, Field, registerEnumType } from '@nestjs/graphql';

registerEnumType(Status, { name: 'Status' });

@ObjectType()
export class Address {
  @Field()
  city: string;
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
