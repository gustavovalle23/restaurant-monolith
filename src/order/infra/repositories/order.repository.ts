import { Order } from '@/order/domain/entities/order.entity';
import { Injectable } from '@nestjs/common';
import {
  IOrderRepository,
  CreateOrderInput,
} from '../../domain/repositories/order.repository';

@Injectable()
export class OrderRepository implements IOrderRepository {
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
