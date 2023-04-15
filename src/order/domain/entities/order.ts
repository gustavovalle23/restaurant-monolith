import { Address } from './address.vo';
import { User } from '@/user/domain/entities';
import { Entity, EntityValidationError, UniqueEntityId } from '@/@seedwork';
import { OrderItem } from './order-item.vo';
import { OrderValidatorFactory } from '../validators/order-validator';


export enum OrderStatus {
  PENDING = 'pending',
  PREPARING = 'preparing',
  DELIVERING = 'delivering',
  DELIVERED = 'delivered',
  CANCELED = 'canceled',
}

export type OrderProperties = {
  id?: string;
  user: User;
  status: OrderStatus;
  items: OrderItem[];
  updatedAt: Date;
  deliveredAt?: Date;
  canceledAt?: Date;
  deliveryAddress: Address;
};


export class Order extends Entity<OrderProperties>{
  constructor(public props: OrderProperties, id?: UniqueEntityId) {
    super(props, id);

    this.props.status = this.props.status === undefined ? OrderStatus.PENDING : this.props.status;
    this.validate()
  }

  prepare(): void {
    if (this.props.status !== OrderStatus.PENDING) {
      throw new Error(`Cannot prepare order with status ${this.props.status}`);
    }

    this.props.status = OrderStatus.PREPARING;
    this.props.updatedAt = new Date();
  }

  deliver(): void {
    if (this.props.status !== OrderStatus.PREPARING && this.props.status !== OrderStatus.DELIVERING) {
      throw new Error(`Cannot deliver order with status ${this.props.status}`);
    }

    this.props.status = OrderStatus.DELIVERED;
    this.props.deliveredAt = new Date();
    this.props.updatedAt = this.props.deliveredAt;
  }

  cancel(): void {
    if (this.props.status !== OrderStatus.PENDING && this.props.status !== OrderStatus.PREPARING) {
      throw new Error(`Cannot cancel order with status ${this.props.status}`);
    }

    this.props.status = OrderStatus.CANCELED;
    this.props.canceledAt = new Date();
    this.props.updatedAt = this.props.canceledAt;
  }


  validate() {
    const validator = OrderValidatorFactory.create();
    const isValid = validator.validate(this.props);
    if (!isValid) {
      throw new EntityValidationError(validator.errors);
    }
  }

}
