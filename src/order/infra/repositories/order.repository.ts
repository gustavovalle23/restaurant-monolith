import { Address, Order, Status } from '@/order/domain/entities';
import { Order as OrderModel } from '@/database/schemas';
import {
  CreateOrderInput,
  IOrderRepository,
} from '@/order/domain/repositories';
import { Injectable } from '@nestjs/common';
import { Document, Model, Types } from 'mongoose';
import { ObjectID } from 'bson';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class OrderRepository implements IOrderRepository {
  constructor(
    @InjectModel('Order')
    private orderModel: Model<OrderModel>,
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

  findById(id: ObjectID): Promise<Order> {
    throw new Error('Method not implemented.');
  }

  findByStatus(status: Status): Promise<Order[]> {
    throw new Error('Method not implemented.');
  }

  findAll(): Promise<Order[]> {
    throw new Error('Method not implemented.');
  }

  remove(id: ObjectID): Promise<void> {
    throw new Error('Method not implemented.');
  }

  private toOrderEntity(
    model: Document<unknown, OrderModel> &
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
