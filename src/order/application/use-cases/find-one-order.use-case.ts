import { Injectable } from '@nestjs/common';
import { OrderOutput } from '../dto/order.output';
import { IOrderRepository } from '../../domain/repositories';

@Injectable()
export class FindOneOrderUseCase {
  constructor(private readonly orderRepository: IOrderRepository) {}

  execute({ orderId }: Input): Output {
    return this.orderRepository.findOneById(orderId);
  }
}

type Input = { orderId: string };
type Output = Promise<OrderOutput>;
