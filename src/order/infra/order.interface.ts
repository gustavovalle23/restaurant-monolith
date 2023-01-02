export interface Order extends Document {
  readonly status: string;
  readonly customerId: number;
  readonly customerAddress: string;
}
