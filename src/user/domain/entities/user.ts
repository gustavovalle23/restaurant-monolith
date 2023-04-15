import { Entity, UniqueEntityId } from '@/@seedwork';
import { CPF } from './value-objects';
import { EntityValidationError } from '@/@seedwork/src/domain/errors/validation-error';
import { UserValidatorFactory } from '../validators/user-validator';

export type UserProperties = {
  name: string
  birthDate: Date
  active: boolean
  password: string
  cpf: CPF
  updatedAt: Date
  deletedAt?: Date
  createdAt: Date
  email?: string
  phone?: string
}

export class User extends Entity<UserProperties> {
  constructor(public readonly props: UserProperties, id?: UniqueEntityId) {
    super(props, id);
    this.props.active =
      this.props.active === undefined ? true : this.props.active;
    User.validate(props);
  }

  deactivate(): void {
    this.props.active = false;
    this.props.updatedAt = new Date();
    User.validate(this.props)

    User.validate(this.props)
  }

  updateEmail(email: string): void {
    this.props.email = email;
    this.props.updatedAt = new Date();

    User.validate(this.props)
  }

  updatePhone(phone: string): void {
    this.props.phone = phone;
    this.props.updatedAt = new Date();

    User.validate(this.props)
  }

  static validate(props: UserProperties) {
    const validator = UserValidatorFactory.create();
    const isValid = validator.validate(props);
    if (!isValid) {
      throw new EntityValidationError(validator.errors);
    }
  }
}
