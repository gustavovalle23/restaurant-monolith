import { Module } from '@nestjs/common';
import {
  CreateOrderUseCase,
  FindAllOrdersUseCase,
  FindOneOrderUseCase,
} from './application/use-cases';
import { IOrderRepository } from './domain/repositories';
import { OrderRepository } from './infra/repositories';
import { OrderResolver } from './infra/resolvers';

@Module({
  providers: [
    OrderResolver,
    FindAllOrdersUseCase,
    CreateOrderUseCase,
    FindOneOrderUseCase,
    {
      provide: IOrderRepository,
      useClass: OrderRepository,
    },
  ],
})
export class OrderModule {}
