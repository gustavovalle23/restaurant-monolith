import { OrderOutput } from '../dto';
import { OrderRepository } from '../repositories/order.repository';

export class FindAllOrdersUseCase {
  constructor(private readonly orderRepository: OrderRepository) {}

  execute(): Output {
    return this.orderRepository.findAll();
  }
}

type Output = Promise<OrderOutput[]>;
