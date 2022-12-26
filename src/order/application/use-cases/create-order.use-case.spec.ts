import { OrderOutput } from '../dto/order.output';
import { OrderRepository } from '../../domain/repositories';
import { CreateOrderUseCase } from './create-order.use-case';
import { Status } from '../../domain/entities/order.entity';

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
    const orderRepository: OrderRepository = MockRepository();
    createOrderUseCase = new CreateOrderUseCase(orderRepository);
  });

  it('should return a new order from create use case', async () => {
    const result = await createOrderUseCase.execute({
      customerId: '123',
      customerAddress: { city: 'Ribeirão Preto' },
    });
    expect(result).toBe(expectedResult);
  });
});
