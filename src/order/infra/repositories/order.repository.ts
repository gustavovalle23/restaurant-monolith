import { Order } from '@/order/domain/entities/order.entity';
import {
  OrderRepository as IRepository,
  CreateOrderInput,
} from '../../domain/repositories/order.repository';

export class OrderRepository implements IRepository {
  create({
    customerAddress,
    customerId,
    status,
  }: CreateOrderInput): Promise<Order> {
    throw new Error('Method not implemented.');
  }

  findOneById(id: string): Promise<Order> {
    throw new Error('Method not implemented.');
  }

  findAll(): Promise<Order[]> {
    throw new Error('Method not implemented.');
  }

  remove(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
