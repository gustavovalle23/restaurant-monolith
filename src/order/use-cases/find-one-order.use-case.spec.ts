import { OrderOutput } from '../dto';
import { OrderRepository } from '../repositories/order.repository';
import { FindOneOrderUseCase } from './find-one-order.use-case';

describe('FindOneOrderUseCase', () => {
  let findOneOrderUseCase: FindOneOrderUseCase;
  const expectedResult: OrderOutput = { exampleField: 2 };

  const MockRepository = () => {
    return {
      create: jest.fn(),
      findOneById: jest.fn().mockResolvedValueOnce(expectedResult),
      findAll: jest.fn(),
      remove: jest.fn(),
    };
  };

  beforeEach(() => {
    const orderRepository: OrderRepository = MockRepository();
    findOneOrderUseCase = new FindOneOrderUseCase(orderRepository);
  });

  it('should return an order from find by id use case', async () => {
    const result = await findOneOrderUseCase.execute({ orderId: '123' });
    expect(result).toBe(expectedResult);
  });
});
