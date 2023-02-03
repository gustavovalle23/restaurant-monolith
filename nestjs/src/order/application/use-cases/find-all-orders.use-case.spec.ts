import { Status } from '@/order/domain/entities';
import { OrderOutput } from '@/order/application/dto';
import { IOrderRepository } from '@/order/domain/repositories';
import { FindAllOrdersUseCase } from '@/order/application/use-cases';

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
    const orderRepository: IOrderRepository = MockRepository();
    findAllOrdersUseCase = new FindAllOrdersUseCase(orderRepository);
  });

  it('should return a list of orders from find all use case', async () => {
    const result = await findAllOrdersUseCase.execute();
    expect(result).toBe(expectedResult);
  });
});
