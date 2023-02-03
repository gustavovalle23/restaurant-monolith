import { Status } from '@/order/domain/entities';
import { IOrderRepository } from '@/order/domain/repositories';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CreateOrderUseCase {
  constructor(private readonly orderRepository: IOrderRepository) { }

  async execute({ status, customerAddress, customerId }: Input): Promise<Output> {
    return this.orderRepository.create({ status, customerAddress, customerId });
  }
}

type Input = {
  status?: Status;
  customerId: string;
  customerAddress: {
    city: string;
    street: string;
    state: string;
    zipCode: string;
  };
};
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
