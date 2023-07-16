import { Resolver, Query, Mutation, Args, Subscription } from '@nestjs/graphql';
import { Injectable, Scope } from '@nestjs/common';
import {
  CreateOrderUseCase,
  FindAllOrdersUseCase,
  FindOneOrderUseCase,
  FindOrdersByStatusUseCase,
} from '@/order/use-cases';
import { FindAllInput, CreateOrderInput, OrderOutput } from '@/order/infra/resolvers/dto';
import { OrderStatus } from '@/order/domain/entities';
import { PubSub } from 'graphql-subscriptions';

const pubSub = new PubSub()

@Injectable()
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

  @Subscription(() => OrderOutput)
  statusUpdated() {
    return pubSub.asyncIterator('statusUpdated')
  }

  @Query(() => [OrderOutput])
  findByStatus(
    @Args('status', { type: () => OrderStatus }) status: OrderStatus,
  ): Promise<OrderOutput[]> {
    return this.findOrdersByStatusUseCase.execute({ status });
  }

  //   @Mutation(() => OrderOutput)
  //   updateOrder(@Args('updateOrderInput') updateOrderInput: UpdateOrderInput) {
  //     return this.orderService.update(updateOrderInput.id, updateOrderInput);
  //   }
}
