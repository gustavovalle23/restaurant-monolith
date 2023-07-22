import { ValueObject } from '@/@seedwork';

export type AddressProps = {
  city: string;
  street: string;
  state: string;
  zipCode: string;
};

export class Address extends ValueObject<AddressProps> {
  constructor(public props: AddressProps) {
    super(props);
  }
}
