import { OrderOutput } from '../dto/order.output';
import { OrderRepository } from '../../domain/repositories';
import { Injectable } from '@nestjs/common';
import { Status } from '../../domain/entities/order.entity';

@Injectable()
export class CreateOrderUseCase {
  constructor(private readonly orderRepository: OrderRepository) {}

  execute({ status, customerAddress, customerId }: Input): Output {
    return this.orderRepository.create({ status, customerAddress, customerId });
  }
}

type Input = {
  status?: Status;
  customerId: string;
  customerAddress: {
    city: string;
  };
};
type Output = Promise<OrderOutput>;
