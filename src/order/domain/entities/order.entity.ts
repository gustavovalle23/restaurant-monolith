import { ObjectID } from 'bson';
import { Address } from './address.ov';

export enum Status {
  SENT = 'SENT',
  PENDENT = 'PENDENT',
}

type OrderProps = {
  id?: ObjectID;
  status?: Status;
  customerId: ObjectID;
  customerAddress: Address;
};

export class Order {
  constructor(private props: OrderProps) {
    this.id = this.props.id ?? new ObjectID();
    this.status = this.props.status ?? Status.PENDENT;
    this.customerId = this.props.customerId;
    this.customerAddress = this.props.customerAddress;
  }

  get id() {
    return this.props.id;
  }

  private set id(value: ObjectID) {
    this.props.id = value;
  }

  get customerId() {
    return this.props.customerId;
  }

  private set customerId(value: ObjectID) {
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
