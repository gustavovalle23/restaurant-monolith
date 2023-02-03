import { Injectable } from '@nestjs/common';
import { IOrderRepository } from '@/order/domain/repositories';
import { Status } from '@/order/domain/entities';

@Injectable()
export class FindAllOrdersUseCase {
  constructor(private readonly orderRepository: IOrderRepository) { }

  async execute(): Promise<Output> {
    return this.orderRepository.findAll();
  }
}

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
