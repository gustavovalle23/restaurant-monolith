import { Address, Order, Status } from '@/order/domain/entities';
import { IOrderRepository } from '@/order/domain/repositories';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CreateOrderUseCase {
  constructor(private readonly orderRepository: IOrderRepository) { }

  async execute(input: Input): Promise<Output> {
    const order = this.entityFromInput(input)
    return this.orderRepository.create(order)
  }

  private entityFromInput({ customerAddress, customerId }: Input): Order {
    const address = new Address({
      city: customerAddress.city,
      state: customerAddress.state,
      street: customerAddress.street,
      zipCode: customerAddress.zipCode
    })

    return new Order({ customerId, status: Status.PENDENT, customerAddress: address })
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
  status: Status;
  customerId: string;
  customerAddress: {
    city: string;
    street: string;
    state: string;
    zipCode: string;
  }
};
