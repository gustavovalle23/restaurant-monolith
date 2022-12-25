import { Order } from './order.entity';

describe('OrderEntity', () => {
  it('should instantiate an entity', () => {
    const order = new Order({ exampleField: 2 });
    expect(order.exampleField).toBe(2);
  });
});
