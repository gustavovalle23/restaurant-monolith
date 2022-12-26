import { ObjectID } from 'bson';
import { Address } from './address.ov';
import { Order, Status } from './order.entity';

describe('OrderEntity', () => {
  it('should instantiate an entity', () => {
    const order = new Order({
      customerId: new ObjectID(),
      customerAddress: new Address({ city: 'FakeCity' }),
    });

    expect(order.id).toBeDefined();
    expect(order.customerId).toBeDefined();
    expect(order.customerAddress).toMatchObject({ city: 'FakeCity' });
    expect(order.status).toEqual(Status.PENDENT);
  });
});
