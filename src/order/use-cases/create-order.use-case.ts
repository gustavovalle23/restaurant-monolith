import { OrderOutput } from '../dto';
import { OrderRepository } from '../repositories/order.repository';

export class CreateOrderUseCase {
  constructor(private readonly orderRepository: OrderRepository) {}

  execute({ exampleField }: Input): Output {
    return this.orderRepository.create({ exampleField });
  }
}

type Input = { exampleField: number };
type Output = Promise<OrderOutput>;
