type AddressProps = { city: string };

export class Address {
  constructor(private props: AddressProps) {
    this.city = this.props.city;
  }

  get city() {
    return this.props.city;
  }

  private set city(value: string) {
    this.props.city = value;
  }
}
