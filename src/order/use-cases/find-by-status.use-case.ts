import { IOrderRepository } from '@/order/domain/repositories';
import { Injectable } from '@nestjs/common';
import { OrderStatus } from '@/order/domain/entities';

@Injectable()
export class FindOrdersByStatusUseCase {
  constructor(private readonly orderRepository: IOrderRepository) { }

  async execute({ status }: Input): Promise<any> {
    return this.orderRepository.findByStatus(status);
  }
}

type Input = { status: OrderStatus };
type Output = {
  status: OrderStatus;
  customerId: string;
  customerAddress: {
    city: string;
    street: string;
    state: string;
    zipCode: string;
  }
}[];
