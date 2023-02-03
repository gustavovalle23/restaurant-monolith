import { IOrderRepository } from '@/order/domain/repositories';
import { Status } from '@/order/domain/entities';
import { CreateOrderUseCase } from '@/order/application/use-cases';

describe('CreateOrderUseCase', () => {
  let createOrderUseCase: CreateOrderUseCase;
  const expectedResult = {
    status: Status.PENDENT,
    customerId: '123',
    customerAddress: { city: 'Ribeirão Preto' },
  };

  const mockRepository = () => {
    return {
      create: jest.fn().mockReturnValue(expectedResult),
      findOneById: jest.fn(),
      findAll: jest.fn(),
      remove: jest.fn(),
    };
  };

  beforeEach(() => {
    const orderRepository: IOrderRepository = mockRepository();
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
