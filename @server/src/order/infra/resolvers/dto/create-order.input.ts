import { OrderStatus } from '@/order/domain/entities';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class AddressInput {
  @Field()
  city: string;

  @Field()
  street: string;

  @Field()
  state: string;

  @Field()
  zipCode: string;
}

@InputType()
export class CreateOrderInput {
  @Field({ defaultValue: OrderStatus.PENDING, nullable: true })
  status?: OrderStatus;

  @Field()
  customerId: string;

  @Field()
  customerAddress: AddressInput;
}
