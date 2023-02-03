import { IOrderRepository } from '@/order/domain/repositories';
import { Injectable } from '@nestjs/common';
import { Status } from '@/order/domain/entities';

@Injectable()
export class FindOneOrderUseCase {
  constructor(private readonly orderRepository: IOrderRepository) { }

  async execute({ orderId }: Input): Promise<Output> {
    return this.orderRepository.findOneById(orderId);
  }
}

type Input = { orderId: string };
type Output = {
  status: Status;
  customerId: string;
  customerAddress: {
    city: string;
    street: string;
    state: string;
    zipCode: string;
  }
};
