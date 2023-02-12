import { Test, TestingModule } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';

import { OrderRepository } from './order.repository';
import { Order, OrderSchema } from '@/database/schemas';
import { Status } from '@/order/domain/entities';

describe('OrderRepository Unit Tests', () => {
  let repository: OrderRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forFeature(
          [
            {
              schema: OrderSchema,
              name: Order.name
            }
          ]
        ),
      ],
      providers: [OrderRepository],
    }).compile();

    repository = module.get<OrderRepository>(OrderRepository);
  });

  it('should create a new order', () => {
    const order = repository.create({
      customerId: '123',
      status: Status.PENDENT,
      customerAddress: {
        city: 'City'
      }
    })
    console.log(order)
    expect(repository).toBeDefined();
  });
});
