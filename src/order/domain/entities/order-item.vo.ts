import { ValueObject } from '@/@seedwork';

export type OrderItemProperties = {
  name: string;
  observation: string;
  price: number;
  quantity: number;
};


export class OrderItem extends ValueObject<OrderItemProperties> {
  constructor(public props: OrderItemProperties) {
    super(props);
  }

  get total(): number {
    return this.props.price * this.props.quantity;
  }

  setQuantity(quantity: number): void {
    this.props.quantity = quantity;
  }
}
