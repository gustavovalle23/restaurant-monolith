import { IOrderRepository } from '@/order/domain/repositories';
import { Injectable } from '@nestjs/common';
import { Status } from '@/order/domain/entities';

@Injectable()
export class FindOrdersByStatusUseCase {
  constructor(private readonly orderRepository: IOrderRepository) { }

  async execute({ status }: Input): Promise<Output> {
    return this.orderRepository.findByStatus(status);
  }
}

type Input = { status: Status };
type Output = {
  status: Status;
  customerId: string;
  customerAddress: {
    city: string;
    street: string;
    state: string;
    zipCode: string;
  }
}[];
