import { Order, OrderStatus } from '@/order/domain/entities';
import { ObjectID } from 'bson';

export abstract class IOrderRepository {
  abstract create(data: CreateOrderInput): Promise<Order>;
  abstract findById(id: ObjectID): Promise<Order>;
  abstract findByStatus(status: OrderStatus): Promise<Order[]>;
  abstract findAll(input: FindAllOrdersInput): Promise<Order[]>;
  abstract remove(id: ObjectID): Promise<void>;
}


export type FindAllOrdersInput = {
  skip: number
  limit: number
}

export type CreateOrderInput = {
  status: OrderStatus;
  customerId: string;
  customerAddress: {
    city: string;
  };
};
