import { Injectable } from '@nestjs/common';
import { IOrderRepository } from '@/order/domain/repositories';
import { Status } from '@/order/domain/entities';
import { UseCase } from '@/@seedwork/usecase';

@Injectable()
export class FindAllOrdersUseCase implements UseCase<Input, Output> {
  constructor(private readonly orderRepository: IOrderRepository) { }

  async execute({ limit, skip }: Input): Promise<Output> {
    return this.orderRepository.findAll({ limit, skip });
  }
}

type Input = {
  skip: number
  limit: number
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
