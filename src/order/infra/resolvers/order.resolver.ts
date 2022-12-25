import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { FindAllOrdersUseCase } from '@/order/application/use-cases/find-all-orders.use-case';
import { FindOneOrderUseCase } from '@/order/application/use-cases/find-one-order.use-case';
import { CreateOrderUseCase } from '@/order/application/use-cases/create-order.use-case';
import { OrderOutput } from '@/order/application/dto/order.output';
import { CreateOrderInput } from '@/order/application/dto/create-order.input';
import { Injectable } from '@nestjs/common';
import { Scope } from '@nestjs/common';

@Injectable({ scope: Scope.REQUEST })
@Resolver(() => OrderOutput)
export class OrderResolver {
  constructor(
    private readonly createUseCase: CreateOrderUseCase,
    private readonly findAllUseCase: FindAllOrdersUseCase,
    private readonly findOneUseCase: FindOneOrderUseCase,
  ) {}

  @Mutation(() => OrderOutput)
  createOrder(
    @Args('createOrderInput') createOrderInput: CreateOrderInput,
  ): Promise<OrderOutput> {
    return this.createUseCase.execute(createOrderInput);
  }

  @Query(() => [OrderOutput], { name: 'order' })
  findAll(): Promise<OrderOutput[]> {
    return this.findAllUseCase.execute();
  }

  @Query(() => OrderOutput, { name: 'order' })
  findOne(
    @Args('id', { type: () => String }) id: string,
  ): Promise<OrderOutput> {
    return this.findOneUseCase.execute({ orderId: id });
  }

  //   @Mutation(() => OrderOutput)
  //   updateOrder(@Args('updateOrderInput') updateOrderInput: UpdateOrderInput) {
  //     return this.orderService.update(updateOrderInput.id, updateOrderInput);
  //   }
}
