import { Address, Order, OrderStatus } from '@/order/domain/entities';
import { IOrderRepository } from '@/order/domain/repositories';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CreateOrderUseCase {
  constructor(private readonly orderRepository: IOrderRepository) { }

  async execute(input: Input): Promise<any> {
    const order: any = this.entityFromInput(input)
    return this.orderRepository.create(order)
  }

  private entityFromInput({ customerAddress, customerId }: Input): Order {
    const address = new Address({
      city: customerAddress.city,
      state: customerAddress.state,
      street: customerAddress.street,
      zipCode: customerAddress.zipCode
    })

    return new Order({ status: OrderStatus.PENDING, deliveryAddress: address, items: [], updatedAt: new Date(), user: null })
  }

}

type Input = {
  customerId: string;
  customerAddress: {
    city: string;
    street: string;
    state: string;
    zipCode: string;
  };
};
type Output = {
  status: OrderStatus;
  customerId: string;
  customerAddress: {
    city: string;
    street: string;
    state: string;
    zipCode: string;
  }
};
