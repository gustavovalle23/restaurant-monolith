import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CreateOrderUseCase } from './use-cases/create-order.use-case';
import { OrderOutput } from './dto/order.output';
import { CreateOrderInput } from './dto/create-order.input';
// import { UpdateOrderInput } from './dto/update-order.input';
import { FindAllOrdersUseCase } from './use-cases/find-all-orders.use-case';

@Resolver(() => OrderOutput)
export class OrderResolver {
  constructor(
    private readonly createUseCase: CreateOrderUseCase,
    private readonly findAllUseCase: FindAllOrdersUseCase,
  ) {}

  @Mutation(() => OrderOutput)
  createOrder(@Args('createOrderInput') createOrderInput: CreateOrderInput) {
    return this.createUseCase.execute(createOrderInput);
  }

  @Query(() => [OrderOutput], { name: 'order' })
  findAll() {
    return this.findAllUseCase.execute();
  }

  //   @Query(() => OrderOutput, { name: 'order' })
  //   findOne(@Args('id', { type: () => Int }) id: number) {
  //     return this.orderService.findOne(id);
  //   }

  //   @Mutation(() => OrderOutput)
  //   updateOrder(@Args('updateOrderInput') updateOrderInput: UpdateOrderInput) {
  //     return this.orderService.update(updateOrderInput.id, updateOrderInput);
  //   }
}
