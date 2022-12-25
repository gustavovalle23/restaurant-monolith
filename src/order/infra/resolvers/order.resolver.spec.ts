import { OrderOutput } from '../../application/dto/order.output';
import { OrderRepository } from '../../domain/repositories';
import { OrderResolver } from './order.resolver';
import { FindOneOrderUseCase } from '../../application/use-cases/find-one-order.use-case';
import { FindAllOrdersUseCase } from '../../application/use-cases/find-all-orders.use-case';
import { CreateOrderUseCase } from '../../application/use-cases/create-order.use-case';

describe('orderResolver', () => {
  let orderResolver: OrderResolver;
  let createOrderUseCase: CreateOrderUseCase;
  let findAllOrdersUseCase: FindAllOrdersUseCase;
  let findOneOrderUseCase: FindOneOrderUseCase;
  let repository: OrderRepository;

  beforeEach(async () => {
    createOrderUseCase = new CreateOrderUseCase(repository);
    findAllOrdersUseCase = new FindAllOrdersUseCase(repository);
    findOneOrderUseCase = new FindOneOrderUseCase(repository);

    orderResolver = new OrderResolver(
      createOrderUseCase,
      findAllOrdersUseCase,
      findOneOrderUseCase,
    );
  });

  it('should return a list of all orders', async () => {
    const expectedResult: OrderOutput[] = [
      { exampleField: 2 },
      { exampleField: 3 },
    ];
    jest
      .spyOn(findAllOrdersUseCase, 'execute')
      .mockImplementation(() => Promise.resolve(expectedResult));

    const resolverResult = await orderResolver.findAll();
    expect(resolverResult).toBe(expectedResult);
  });

  it('should return a created order', async () => {
    const expectedResult = new OrderOutput();
    expectedResult.exampleField = 2;

    jest
      .spyOn(createOrderUseCase, 'execute')
      .mockImplementation(() => Promise.resolve(expectedResult));

    const resolverResult = await orderResolver.createOrder({ exampleField: 2 });
    expect(resolverResult).toBe(expectedResult);
  });

  it('should return a found order', async () => {
    const expectedResult = new OrderOutput();
    expectedResult.exampleField = 2;

    jest
      .spyOn(findOneOrderUseCase, 'execute')
      .mockImplementation(() => Promise.resolve(expectedResult));

    const resolverResult = await orderResolver.findOne('123');
    expect(resolverResult).toEqual(expectedResult);
  });
});
