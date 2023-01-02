import { OrderOutput } from '../dto/order.output';
import { IOrderRepository } from '../../domain/repositories';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FindAllOrdersUseCase {
  constructor(private readonly orderRepository: IOrderRepository) {}

  execute(): Output {
    return this.orderRepository.findAll();
  }
}

type Output = Promise<OrderOutput[]>;
