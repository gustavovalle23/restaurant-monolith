import { Order } from '@/order/domain/entities';
import { Order as OrderInterface } from '@/order/infra/order.interface';
import {
  CreateOrderInput,
  IOrderRepository,
} from '@/order/domain/repositories';
import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

@Injectable()
export class OrderRepository implements IOrderRepository {
  constructor(
    @Inject('ORDER_MODEL')
    private orderModel: Model<OrderInterface>,
  ) {}

  create({
    customerAddress,
    customerId,
    status,
  }: CreateOrderInput): Promise<any> {
    const createdOrder = new this.orderModel({
      customerAddress,
      customerId,
      status,
    });
    return createdOrder.save();
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
