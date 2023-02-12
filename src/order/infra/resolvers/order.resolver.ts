import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Injectable, Scope } from '@nestjs/common';
import {
  CreateOrderUseCase,
  FindAllOrdersUseCase,
  FindOneOrderUseCase,
  FindOrdersByStatusUseCase,
} from '@/order/use-cases';
import { FindAllInput, CreateOrderInput, OrderOutput } from '@/order/infra/resolvers/dto';
import { Status } from '@/order/domain/entities';

@Injectable({ scope: Scope.REQUEST })
@Resolver(() => OrderOutput)
export class OrderResolver {
  constructor(
    private readonly createUseCase: CreateOrderUseCase,
    private readonly findAllUseCase: FindAllOrdersUseCase,
    private readonly findOneUseCase: FindOneOrderUseCase,
    private readonly findOrdersByStatusUseCase: FindOrdersByStatusUseCase,
  ) { }

  @Mutation(() => OrderOutput)
  createOrder(
    @Args('createOrderInput') createOrderInput: CreateOrderInput,
  ): Promise<OrderOutput> {
    return this.createUseCase.execute(createOrderInput);
  }

  @Query(() => [OrderOutput])
  findAll(@Args() { skip, limit }: FindAllInput): Promise<OrderOutput[]> {
    return this.findAllUseCase.execute({ skip, limit });
  }

  @Query(() => OrderOutput)
  findOne(
    @Args('id', { type: () => String }) id: string,
  ): Promise<OrderOutput> {
    return this.findOneUseCase.execute({ orderId: id });
  }

  @Query(() => [OrderOutput])
  findByStatus(
    @Args('status', { type: () => Status }) status: Status,
  ): Promise<OrderOutput[]> {
    return this.findOrdersByStatusUseCase.execute({ status });
  }

  //   @Mutation(() => OrderOutput)
  //   updateOrder(@Args('updateOrderInput') updateOrderInput: UpdateOrderInput) {
  //     return this.orderService.update(updateOrderInput.id, updateOrderInput);
  //   }
}
