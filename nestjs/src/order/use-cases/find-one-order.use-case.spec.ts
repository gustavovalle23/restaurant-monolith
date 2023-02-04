import { Status } from '@/order/domain/entities';
import { IOrderRepository } from '@/order/domain/repositories';
import { FindOneOrderUseCase } from '@/order/use-cases';

describe('FindOneOrderUseCase', () => {
  let findOneOrderUseCase: FindOneOrderUseCase;
  const expectedResult = {
    status: Status.PENDENT,
    customerId: '123',
    customerAddress: {
      city: 'Fake City',
      state: 'Fake State',
      street: 'Fake Street',
      zipCode: 'Fake Zip Code',
    },
  };

  const MockRepository = () => {
    return {
      create: jest.fn(),
      findById: jest.fn().mockResolvedValueOnce(expectedResult),
      findByStatus: jest.fn(),
      findAll: jest.fn(),
      remove: jest.fn(),
    };
  };

  beforeEach(() => {
    const orderRepository: IOrderRepository = MockRepository();
    findOneOrderUseCase = new FindOneOrderUseCase(orderRepository);
  });

  it('should return an order from find by id use case', async () => {
    const output = await findOneOrderUseCase.execute({ orderId: '111111111111111111111111' });
    expect(output.customerAddress).toBeDefined()
    expect(output.customerAddress.city).toBeDefined()
    expect(output.customerAddress.state).toBeDefined()
    expect(output.customerAddress.street).toBeDefined()
    expect(output.customerAddress.zipCode).toBeDefined()
    expect(output.customerId).toBeDefined()
    expect(output.status).toBeDefined()
    expect(output).toStrictEqual(expectedResult)
  });
});
