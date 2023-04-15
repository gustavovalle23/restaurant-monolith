import { Injectable } from '@nestjs/common';
import { IOrderRepository } from '@/order/domain/repositories';
import { OrderStatus } from '@/order/domain/entities';
import { User } from '@/user/domain/entities';
import DefaultUseCase from '@/@seedwork/src/application/use-case';

@Injectable()
export class FindAllOrdersUseCase implements DefaultUseCase<Input, Output> {
  constructor(private readonly orderRepository: IOrderRepository) { }

  async execute({ limit, skip }: Input): Promise<any> {
    return this.orderRepository.findAll({ limit, skip });
  }
}

type Input = {
  skip: number
  limit: number
}

type Output = {
  id: string;
  user: User;
  status: OrderStatus;
  items: []
  updatedAt: Date
  deliveredAt: Date
  canceledAt: Date
  deliveryAddress: {
    city: string;
    street: string;
    state: string;
    zipCode: string;
  }
}[];
