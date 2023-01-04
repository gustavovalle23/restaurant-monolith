type AddressProps = {
  city: string;
  street: string;
  state: string;
  zipCode: string;
};

export class Address {
  constructor(private props: AddressProps) {
    this.city = this.props.city;
    this.state = this.props.state;
    this.street = this.props.street;
    this.zipCode = this.props.zipCode;
  }

  get city() {
    return this.props.city;
  }

  private set city(value: string) {
    this.props.city = value;
  }

  get street() {
    return this.props.street;
  }

  private set street(value: string) {
    this.props.street = value;
  }

  get state() {
    return this.props.state;
  }

  private set state(value: string) {
    this.props.state = value;
  }

  private set zipCode(value: string) {
    this.props.zipCode = value;
  }

  get zipCode() {
    return this.props.zipCode;
  }
}
