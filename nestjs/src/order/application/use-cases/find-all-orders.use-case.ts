import { Injectable } from '@nestjs/common';
import { OrderOutput } from '@/order/application/dto';
import { IOrderRepository } from '@/order/domain/repositories';

@Injectable()
export class FindAllOrdersUseCase {
  constructor(private readonly orderRepository: IOrderRepository) {}

  async execute(): Promise<Output> {
    return this.orderRepository.findAll();
  }
}

type Output = OrderOutput[];
