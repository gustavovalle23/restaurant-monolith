import { OrderOutput } from '../dto/order.output';
import { IOrderRepository } from '../../domain/repositories';
import { Injectable } from '@nestjs/common';
import { Status } from '../../domain/entities/order.entity';

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
  };
};
type Output = Promise<OrderOutput>;
