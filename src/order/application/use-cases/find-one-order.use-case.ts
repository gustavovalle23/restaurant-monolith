import { Injectable } from '@nestjs/common';
import { OrderOutput } from '../dto/order.output';
import { OrderRepository } from '../../domain/repositories';

@Injectable()
export class FindOneOrderUseCase {
  constructor(private readonly orderRepository: OrderRepository) {}

  execute({ orderId }: Input): Output {
    return this.orderRepository.findOneById(orderId);
  }
}

type Input = { orderId: string };
type Output = Promise<OrderOutput>;
