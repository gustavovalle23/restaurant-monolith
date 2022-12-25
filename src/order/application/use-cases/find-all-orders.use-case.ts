import { OrderOutput } from '../dto/order.output';
import { OrderRepository } from '../../domain/repositories';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FindAllOrdersUseCase {
  constructor(private readonly orderRepository: OrderRepository) {}

  execute(): Output {
    return this.orderRepository.findAll();
  }
}

type Output = Promise<OrderOutput[]>;
