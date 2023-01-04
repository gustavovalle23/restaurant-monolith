import { Status } from '@/order/domain/entities';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ _id: false })
export class Address {
  @Prop()
  city: string;

  @Prop()
  street: string;

  @Prop()
  state: string;

  @Prop()
  zipCode: string;
}

export class Order {
  @Prop()
  status: Status;

  @Prop()
  customerId: string;

  @Prop()
  address: Address;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
