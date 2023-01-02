import { OrderOutput } from '../dto/order.output';
import { IOrderRepository } from '../../domain/repositories';
import { FindOneOrderUseCase } from './find-one-order.use-case';
import { Status } from '../../domain/entities/order.entity';

describe('FindOneOrderUseCase', () => {
  let findOneOrderUseCase: FindOneOrderUseCase;
  const expectedResult: OrderOutput = {
    status: Status.PENDENT,
    customerId: '123',
    customerAddress: { city: 'Ribeirão Preto' },
  };

  const MockRepository = () => {
    return {
      create: jest.fn(),
      findOneById: jest.fn().mockResolvedValueOnce(expectedResult),
      findAll: jest.fn(),
      remove: jest.fn(),
    };
  };

  beforeEach(() => {
    const orderRepository: IOrderRepository = MockRepository();
    findOneOrderUseCase = new FindOneOrderUseCase(orderRepository);
  });

  it('should return an order from find by id use case', async () => {
    const result = await findOneOrderUseCase.execute({ orderId: '123' });
    expect(result).toBe(expectedResult);
  });
});
