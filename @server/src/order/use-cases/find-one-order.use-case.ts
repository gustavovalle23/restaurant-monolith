import { IOrderRepository } from '@/order/domain/repositories';
import { Injectable } from '@nestjs/common';
import { OrderStatus } from '@/order/domain/entities';
import { ObjectID } from 'bson';

@Injectable()
export class FindOneOrderUseCase {
  constructor(private readonly orderRepository: IOrderRepository) { }

  async execute({ orderId }: Input): Promise<any> {
    return this.orderRepository.findById(new ObjectID(orderId));
  }
}

type Input = { orderId: string };
type Output = {
  status: OrderStatus;
  customerId: string;
  customerAddress: {
    city: string;
    street: string;
    state: string;
    zipCode: string;
  }
};
