import { OrderOutput } from '../dto/order.output';
import { OrderRepository } from '../../domain/repositories';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CreateOrderUseCase {
  constructor(private readonly orderRepository: OrderRepository) {}

  execute({ exampleField }: Input): Output {
    return this.orderRepository.create({ exampleField });
  }
}

type Input = { exampleField: number };
type Output = Promise<OrderOutput>;
