import { Order } from '@/database/schemas';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { IOrderRepository } from './domain/repositories';
import { OrderRepository } from './infra/repositories';
import { OrderResolver } from './infra/resolvers';
import { CreateOrderUseCase, FindAllOrdersUseCase, FindOneOrderUseCase } from '@/order/use-cases';

@Module({
  imports: [MongooseModule.forFeature([{ schema: Order, name: Order.name }])],
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
export class OrderModule { }
