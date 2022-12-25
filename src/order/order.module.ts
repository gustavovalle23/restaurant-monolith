import { Module } from '@nestjs/common';
import { CreateOrderUseCase } from './application/use-cases/create-order.use-case';
import { FindAllOrdersUseCase } from './application/use-cases/find-all-orders.use-case';
import { FindOneOrderUseCase } from './application/use-cases/find-one-order.use-case';
import { OrderResolver } from './infra/resolvers';

@Module({
  providers: [
    OrderResolver,
    FindAllOrdersUseCase,
    CreateOrderUseCase,
    FindOneOrderUseCase,
  ],
})
export class OrderModule {}
