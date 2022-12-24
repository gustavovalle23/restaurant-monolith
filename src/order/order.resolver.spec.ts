import { OrderOutput } from './dto';
import { OrderResolver } from './order.resolver';
import { CreateOrderUseCase, FindAllOrdersUseCase } from './use-cases';

describe('orderResolver', () => {
  let orderResolver: OrderResolver;
  let createOrderUseCase: CreateOrderUseCase;
  let findAllOrdersUseCase: FindAllOrdersUseCase;

  beforeEach(async () => {
    createOrderUseCase = new CreateOrderUseCase();
    findAllOrdersUseCase = new FindAllOrdersUseCase();
    orderResolver = new OrderResolver(createOrderUseCase, findAllOrdersUseCase);
  });

  it('should return a list of all orders', () => {
    const result = [];
    jest
      .spyOn(findAllOrdersUseCase, 'execute')
      .mockImplementation(() => result);

    expect(orderResolver.findAll()).toBe(result);
  });

  it('should return a created order', () => {
    const result = new OrderOutput();
    result.exampleField = 2;

    jest.spyOn(createOrderUseCase, 'execute').mockImplementation(() => result);

    expect(orderResolver.createOrder({ exampleField: 2 })).toBe(result);
  });
});
