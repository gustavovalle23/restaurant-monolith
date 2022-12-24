import { Order } from './entities/order.entity';

export interface OrderRepository {
  create(data: CreateOrderInput): Promise<Order>;
  findOneById(id: string): Promise<Order>;
  findAll(): Promise<Order[]>;
  remove(id: string): Promise<void>;
}

type CreateOrderInput = { name: string };
