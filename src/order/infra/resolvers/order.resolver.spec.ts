import { OrderOutput } from '../../application/dto/order.output';
import { IOrderRepository } from '../../domain/repositories';
import { OrderResolver } from './order.resolver';
import { FindOneOrderUseCase } from '../../application/use-cases/find-one-order.use-case';
import { FindAllOrdersUseCase } from '../../application/use-cases/find-all-orders.use-case';
import { CreateOrderUseCase } from '../../application/use-cases/create-order.use-case';
import { Status } from '../../domain/entities/order.entity';

describe('orderResolver', () => {
  let orderResolver: OrderResolver;
  let createOrderUseCase: CreateOrderUseCase;
  let findAllOrdersUseCase: FindAllOrdersUseCase;
  let findOneOrderUseCase: FindOneOrderUseCase;
  let repository: IOrderRepository;

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
      {
        status: Status.PENDENT,
        customerId: '123',
        customerAddress: { city: 'Ribeirão Preto' },
      },
      {
        status: Status.PENDENT,
        customerId: '123',
        customerAddress: { city: 'Ribeirão Preto' },
      },
    ];
    jest
      .spyOn(findAllOrdersUseCase, 'execute')
      .mockImplementation(() => Promise.resolve(expectedResult));

    const resolverResult = await orderResolver.findAll();
    expect(resolverResult).toBe(expectedResult);
  });

  it('should return a created order', async () => {
    const expectedResult = new OrderOutput({
      status: Status.PENDENT,
      customerId: '123',
      customerAddress: { city: 'Ribeirão Preto' },
    });

    jest
      .spyOn(createOrderUseCase, 'execute')
      .mockImplementation(() => Promise.resolve(expectedResult));

    const resolverResult = await orderResolver.createOrder({
      customerAddress: { city: 'Ribeirão Preto' },
      customerId: '123',
    });
    expect(resolverResult).toBe(expectedResult);
  });

  it('should return a found order', async () => {
    const expectedResult = {
      customerAddress: { city: 'Ribeirão Preto' },
      customerId: '123',
      status: Status.PENDENT,
    };

    jest
      .spyOn(findOneOrderUseCase, 'execute')
      .mockImplementation(() => Promise.resolve(expectedResult));

    const resolverResult = await orderResolver.findOne('123');
    expect(resolverResult).toEqual(expectedResult);
  });
});
