import { Order, OrderSchema } from '@/database/schemas';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { IOrderRepository } from './domain/repositories';
import { OrderRepository } from './infra/repositories';
import { OrderResolver } from './infra/resolvers';
import { CreateOrderUseCase, FindAllOrdersUseCase, FindOneOrderUseCase, FindOrdersByStatusUseCase } from '@/order/use-cases';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Order.name,
        schema: OrderSchema,
      }
    ])
  ],
  providers: [
    OrderResolver,
    FindAllOrdersUseCase,
    CreateOrderUseCase,
    FindOneOrderUseCase,
    FindOrdersByStatusUseCase,
    {
      provide: IOrderRepository,
      useClass: OrderRepository,
    },
  ],
})
export class OrderModule { }
