import { Status } from '@/order/domain/entities';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class AddressInput {
  @Field()
  city: string;
}

@InputType()
export class CreateOrderInput {
  @Field({ defaultValue: Status.PENDENT, nullable: true })
  status?: Status;

  @Field()
  customerId: string;

  @Field()
  customerAddress: AddressInput;
}
