import { ObjectID } from 'bson';
import { Address } from './address.ov';
import { Order, Status } from './order.entity';

describe('OrderEntity', () => {
  it('should instantiate an entity', () => {
    const order = new Order({
      customerId: new ObjectID().toString(),
      status: Status.PENDENT,
      customerAddress: new Address({
        city: 'FakeCity',
        state: 'FakeState',
        street: 'FakeStreet',
        zipCode: '00000000',
      }),
    });

    expect(order.id).toBeDefined();
    expect(order.customerId).toBeDefined();
    expect(order.customerAddress).toMatchObject({
      city: 'FakeCity',
      state: 'FakeState',
      street: 'FakeStreet',
      zipCode: '00000000',
    });
    expect(order.status).toEqual(Status.PENDENT);
  });
});
