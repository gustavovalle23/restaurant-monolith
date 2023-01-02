import { Order } from '@/order/domain/entities';
import {
  CreateOrderInput,
  IOrderRepository,
} from '@/order/domain/repositories';
import { Injectable } from '@nestjs/common';

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
