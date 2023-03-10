import { Status } from '@/order/domain/entities';
import { IOrderRepository } from '@/order/domain/repositories';
import { FindOrdersByStatusUseCase } from '@/order/use-cases';

describe('FindOrdersByStatusUseCase', () => {
  let findOrdersByStatusUseCase: FindOrdersByStatusUseCase;
  let orderRepository: IOrderRepository;

  const expectedResult = [
    {
      status: Status.PENDENT,
      customerId: '123',
      customerAddress: { city: 'Ribeirão Preto' },
    },
  ];

  const MockRepository = () => {
    return {
      create: jest.fn(),
      findById: jest.fn(),
      findByStatus: jest.fn().mockResolvedValueOnce(expectedResult),
      findAll: jest.fn(),
      remove: jest.fn(),
    };
  };

  beforeEach(() => {
    orderRepository = MockRepository();
    findOrdersByStatusUseCase = new FindOrdersByStatusUseCase(orderRepository);
  });

  it('should return a list of orders of specific status use case', async () => {
    const result = await findOrdersByStatusUseCase.execute({ status: Status.PENDENT });
    const spy = jest.spyOn(orderRepository, 'findByStatus')
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(Status.PENDENT)
    expect(result).toBe(expectedResult);
  });
});
