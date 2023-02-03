import { OrderOutput } from '@/order/infra/resolvers/dto';
import {
  CreateOrderUseCase,
  FindAllOrdersUseCase,
  FindOneOrderUseCase,
} from '@/order/use-cases';
import { Status } from '@/order/domain/entities';
import { IOrderRepository } from '@/order/domain/repositories';
import { OrderResolver } from './order.resolver';

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
    const expectedResult = [
      {
        status: Status.PENDENT,
        customerId: '123',
        customerAddress: {
          city: 'Ribeirão Preto',
          street: 'Random Street',
          state: 'Random State',
          zipCode: '11111111',
        },
      },
      {
        status: Status.PENDENT,
        customerId: '123',
        customerAddress: {
          city: 'Ribeirão Preto',
          street: 'Random Street',
          state: 'Random State',
          zipCode: '11111111',
        },
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
      customerAddress: {
        city: 'Ribeirão Preto',
        street: 'Random Street',
        state: 'Random State',
        zipCode: '11111111',
      },
    });

    jest
      .spyOn(createOrderUseCase, 'execute')
      .mockImplementation(() => Promise.resolve(expectedResult));

    const resolverResult = await orderResolver.createOrder({
      customerAddress: {
        city: 'Fake City',
        street: 'Fake Street',
        state: 'Fake State',
        zipCode: 'Fake Zip Code',
      },
      customerId: '123',
    });
    expect(resolverResult).toBe(expectedResult);
  });

  it('should return a found order', async () => {
    const expectedResult = {
      customerId: '123',
      status: Status.PENDENT,
      customerAddress: {
        city: 'Ribeirão Preto',
        street: 'Random Street',
        state: 'Random State',
        zipCode: '11111111',
      },
    };

    jest
      .spyOn(findOneOrderUseCase, 'execute')
      .mockImplementation(() => Promise.resolve(expectedResult));

    const resolverResult = await orderResolver.findOne('123');
    expect(resolverResult).toEqual(expectedResult);
  });
});
