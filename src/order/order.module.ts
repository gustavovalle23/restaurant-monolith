import { Module } from '@nestjs/common';
import { CreateOrderUseCase, FindAllOrdersUseCase } from './use-cases';
import { OrderResolver } from './order.resolver';

@Module({
  providers: [OrderResolver, CreateOrderUseCase, FindAllOrdersUseCase],
})
export class OrderModule {}
