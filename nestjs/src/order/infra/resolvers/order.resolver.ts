import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Injectable, Scope } from '@nestjs/common';
import {
  CreateOrderUseCase,
  FindAllOrdersUseCase,
  FindOneOrderUseCase,
} from '@/order/use-cases';
import { CreateOrderInput, OrderOutput } from '@/order/infra/resolvers/dto';
import { FindAllInput } from './dto/find-order.input';

@Injectable({ scope: Scope.REQUEST })
@Resolver(() => OrderOutput)
export class OrderResolver {
  constructor(
    private readonly createUseCase: CreateOrderUseCase,
    private readonly findAllUseCase: FindAllOrdersUseCase,
    private readonly findOneUseCase: FindOneOrderUseCase,
  ) { }

  @Mutation(() => OrderOutput)
  createOrder(
    @Args('createOrderInput') createOrderInput: CreateOrderInput,
  ): Promise<OrderOutput> {
    return this.createUseCase.execute(createOrderInput);
  }

  @Query(() => [OrderOutput], { name: 'order' })
  findAll({ skip, limit }: FindAllInput): Promise<OrderOutput[]> {
    return this.findAllUseCase.execute({ skip, limit });
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
