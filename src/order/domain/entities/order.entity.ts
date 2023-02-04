import { ObjectID } from 'bson';
import { Address } from './address.ov';

export enum Status {
  SENT = 'SENT',
  PENDENT = 'PENDENT',
}

type OrderProps = {
  id?: string;
  status: Status;
  customerId: string;
  customerAddress: Address;
};

export class Order {
  constructor(private props: OrderProps) {
    this.id = this.props.id ?? new ObjectID().toString();
    this.status = this.props.status;
    this.customerId = this.props.customerId;
    this.customerAddress = this.props.customerAddress;
  }

  get id() {
    return this.props.id;
  }

  private set id(value: string) {
    this.props.id = value;
  }

  get customerId() {
    return this.props.customerId;
  }

  private set customerId(value: string) {
    this.props.customerId = value;
  }

  get status() {
    return this.props.status;
  }

  private set status(value: Status) {
    this.props.status = value;
  }

  get customerAddress() {
    return this.props.customerAddress;
  }

  private set customerAddress(value: Address) {
    this.props.customerAddress = value;
  }
}
