import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Injectable, Scope } from '@nestjs/common';
import { CreateOrderInput } from '../../application/dto/create-order.input';
import { OrderOutput } from '../../application/dto/order.output';
import { CreateOrderUseCase } from '../../application/use-cases/create-order.use-case';
import { FindAllOrdersUseCase } from '../../application/use-cases/find-all-orders.use-case';
import { FindOneOrderUseCase } from '../../application/use-cases/find-one-order.use-case';

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
