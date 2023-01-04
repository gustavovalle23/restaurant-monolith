import { Status } from '@/order/domain/entities';
import { IOrderRepository } from '@/order/domain/repositories';
import { Injectable } from '@nestjs/common';
import { OrderOutput } from '@/order/application/dto';

@Injectable()
export class CreateOrderUseCase {
  constructor(private readonly orderRepository: IOrderRepository) {}

  execute({ status, customerAddress, customerId }: Input): Output {
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
type Output = Promise<OrderOutput>;
