import { Injectable } from '@nestjs/common';
import { OrderOutput } from '../dto';
import { OrderRepository } from '../repositories/order.repository';

@Injectable()
export class FindOneOrderUseCase {
  constructor(private readonly orderRepository: OrderRepository) {}

  execute({ orderId }: Input): Output {
    return this.orderRepository.findOneById(orderId);
  }
}

type Input = { orderId: string };
type Output = Promise<OrderOutput>;
