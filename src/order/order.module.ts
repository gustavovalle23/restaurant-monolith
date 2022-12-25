import { Module } from '@nestjs/common';
import { CreateOrderUseCase, FindAllOrdersUseCase } from './use-cases';
import { OrderResolver } from './resolvers';

@Module({
  providers: [OrderResolver, CreateOrderUseCase, FindAllOrdersUseCase],
})
export class OrderModule {}
