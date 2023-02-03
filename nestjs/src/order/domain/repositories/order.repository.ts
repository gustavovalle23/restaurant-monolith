import { Repository } from '@/@seedwork/domain';
import { Order, Status } from '@/order/domain/entities';
import { ObjectID } from 'bson';

export abstract class IOrderRepository implements Repository<Order, ObjectID> {
  abstract create(data: CreateOrderInput): Promise<Order>;
  abstract findById(id: ObjectID): Promise<Order>;
  abstract findAll(): Promise<Order[]>;
  abstract remove(id: ObjectID): Promise<void>;
}

export type CreateOrderInput = {
  status: Status;
  customerId: string;
  customerAddress: {
    city: string;
  };
};
