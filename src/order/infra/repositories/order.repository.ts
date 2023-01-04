import { Address, Order } from '@/order/domain/entities';
import { Order as OrderModel, OrderDocument } from '@/database/schemas';
import {
  CreateOrderInput,
  IOrderRepository,
} from '@/order/domain/repositories';
import { Inject, Injectable } from '@nestjs/common';
import { Document, Model, Types } from 'mongoose';

@Injectable()
export class OrderRepository implements IOrderRepository {
  constructor(
    @Inject(OrderModel.name)
    private orderModel: Model<OrderDocument>,
  ) {}

  async create({
    customerAddress,
    customerId,
    status,
  }: CreateOrderInput): Promise<Order> {
    const createdOrder = await this.orderModel.create({
      customerAddress,
      customerId,
      status,
    });

    return this.toOrderEntity(createdOrder);
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

  private toOrderEntity(
    model: Document<unknown, any, OrderModel> &
      OrderModel & {
        _id: Types.ObjectId;
      } & Required<{
        _id: Types.ObjectId;
      }>,
  ): Order {
    const customerAddress = new Address({
      city: model.address.city,
      state: model.address.state,
      street: model.address.street,
      zipCode: model.address.zipCode,
    });
    return new Order({
      id: model._id.toString(),
      status: model.status,
      customerId: model.customerId,
      customerAddress,
    });
  }
}
