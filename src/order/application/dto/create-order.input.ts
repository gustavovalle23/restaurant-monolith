import { InputType, Field } from '@nestjs/graphql';
import { Status } from '../../domain/entities/order.entity';

@InputType()
export class AddressInput {
  @Field()
  city: string;
}

@InputType()
export class CreateOrderInput {
  @Field({ defaultValue: Status, nullable: true })
  status?: Status;
  @Field()
  customerId: string;
  @Field()
  customerAddress: AddressInput;
}
