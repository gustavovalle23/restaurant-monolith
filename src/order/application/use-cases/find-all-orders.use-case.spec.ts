import { OrderOutput } from '../dto/order.output';
import { OrderRepository } from '../../domain/repositories';
import { FindAllOrdersUseCase } from './find-all-orders.use-case';
import { Status } from '../../domain/entities/order.entity';

describe('FindAllOrdersUseCase', () => {
  let findAllOrdersUseCase: FindAllOrdersUseCase;
  const expectedResult: OrderOutput[] = [
    {
      status: Status.PENDENT,
      customerId: '123',
      customerAddress: { city: 'Ribeirão Preto' },
    },
  ];

  const MockRepository = () => {
    return {
      create: jest.fn(),
      findOneById: jest.fn(),
      findAll: jest.fn().mockResolvedValueOnce(expectedResult),
      remove: jest.fn(),
    };
  };

  beforeEach(() => {
    const orderRepository: OrderRepository = MockRepository();
    findAllOrdersUseCase = new FindAllOrdersUseCase(orderRepository);
  });

  it('should return a list of orders from find all use case', async () => {
    const result = await findAllOrdersUseCase.execute();
    expect(result).toBe(expectedResult);
  });
});
