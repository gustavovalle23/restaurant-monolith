import { IOrderRepository } from '@/order/domain/repositories';
import { Status } from '@/order/domain/entities';
import { CreateOrderUseCase } from '@/order/use-cases';

describe('CreateOrderUseCase', () => {
  let createOrderUseCase: CreateOrderUseCase;
  let orderRepository: IOrderRepository;

  const expectedResult = {
    status: Status.PENDENT,
    customerId: '123',
    customerAddress: { city: 'Ribeirão Preto' },
  };

  const mockRepository = () => {
    return {
      create: jest.fn().mockReturnValue(expectedResult),
      findById: jest.fn(),
      findAll: jest.fn(),
      remove: jest.fn(),
    };
  };

  beforeEach(() => {
    orderRepository = mockRepository();
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

    const spy = jest.spyOn(orderRepository, 'create')
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith({
      props: {
        id: expect.any(String),
        customerId: '123',
        status: Status.PENDENT,
        customerAddress: {
          props: {
            city: 'Fake City',
            state: 'Fake State',
            street: 'Fake Street',
            zipCode: 'Fake Zip Code'
          }
        }
      }
    })

    expect(result).toBe(expectedResult);
  });
});
