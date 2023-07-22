import { IsNotEmpty, IsString } from 'class-validator';
import { ClassValidatorFields } from '@/@seedwork';
import { AddressProps } from '../entities';

export class AddressRules {
  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  street: string;

  @IsString()
  @IsNotEmpty()
  state: string;

  @IsString()
  @IsNotEmpty()
  zipCode: string;

  constructor({ city, street, state, zipCode }: AddressProps) {
    Object.assign(this, {
      city,
      street,
      state,
      zipCode,
    });
  }
}

export class AddressValidator extends ClassValidatorFields<AddressRules> {
  validate(data: AddressProps): boolean {
    return super.validate(new AddressRules(data ?? ({} as never)));
  }
}

export class AddressValidatorFactory {
  static create() {
    return new AddressValidator();
  }
}
