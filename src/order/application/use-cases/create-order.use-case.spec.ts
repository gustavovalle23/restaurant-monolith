import { CreateOrderUseCase } from './create-order.use-case';
import { IOrderRepository } from '@/order/domain/repositories';
import { Status } from '@/order/domain/entities';
import { OrderOutput } from '@/order/application/dto';

describe('CreateOrderUseCase', () => {
  let createOrderUseCase: CreateOrderUseCase;
  const expectedResult: OrderOutput = {
    status: Status.PENDENT,
    customerId: '123',
    customerAddress: { city: 'Ribeirão Preto' },
  };

  const MockRepository = () => {
    return {
      create: jest.fn().mockReturnValue(expectedResult),
      findOneById: jest.fn(),
      findAll: jest.fn(),
      remove: jest.fn(),
    };
  };

  beforeEach(() => {
    const orderRepository: IOrderRepository = MockRepository();
    createOrderUseCase = new CreateOrderUseCase(orderRepository);
  });

  it('should return a new order from create use case', async () => {
    const result = await createOrderUseCase.execute({
      customerId: '123',
      customerAddress: {
        city: 'Fake City',
        state: 'Fake State',
        street: 'Fake Street',
        zipCode: 'Fake Zip Code',
      },
    });
    expect(result).toBe(expectedResult);
  });
});
