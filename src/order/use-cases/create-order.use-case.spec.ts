import { OrderOutput } from '../dto';
import { OrderRepository } from '../repositories/order.repository';
import { CreateOrderUseCase } from './create-order.use-case';

describe('CreateOrderUseCase', () => {
  let createOrderUseCase: CreateOrderUseCase;
  const expectedResult: OrderOutput = { exampleField: 2 };

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
    const result = await createOrderUseCase.execute({ exampleField: 2 });
    expect(result).toBe(expectedResult);
  });
});
