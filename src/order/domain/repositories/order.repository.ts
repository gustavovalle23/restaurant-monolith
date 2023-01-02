import { Order, Status } from '@/order/domain/entities';

export abstract class IOrderRepository {
  abstract create(data: CreateOrderInput): Promise<Order>;
  abstract findOneById(id: string): Promise<Order>;
  abstract findAll(): Promise<Order[]>;
  abstract remove(id: string): Promise<void>;
}

export type CreateOrderInput = {
  status: Status;
  customerId: string;
  customerAddress: {
    city: string;
  };
};
