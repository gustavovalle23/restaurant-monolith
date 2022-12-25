type OrderProps = { exampleField: number };

export class Order {
  constructor(private props: OrderProps) {
    this.exampleField = this.props.exampleField;
  }

  private set exampleField(value: number) {
    this.props.exampleField = value;
  }

  get exampleField() {
    return this.props.exampleField;
  }
}
