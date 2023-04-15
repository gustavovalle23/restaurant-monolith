import { Entity, EntityValidationError, UniqueEntityId } from '@/@seedwork';
import { UserValidatorFactory } from '../validators/user-validator';
import { CPF } from './cpf';
import { EmailUpdater, PhoneUpdater } from '../updaters';

export type UserProperties = {
  name: string
  birthDate: Date
  active: boolean
  password: string
  cpf: CPF
  email?: string
  phone?: string
  updatedAt: Date
  deletedAt?: Date
  createdAt: Date
}

export class User extends Entity<UserProperties> {
  constructor(public readonly props: UserProperties, id?: UniqueEntityId) {
    super(props, id);
    this.props.active =
      this.props.active === undefined ? true : this.props.active;

    User.validate(this.props)
  }

  deactivate(): void {
    this.props.active = false;
    this.props.updatedAt = new Date();

    this.validate()
  }

  updateEmail(email: string): void {
    const updater = new EmailUpdater();
    updater.update(this.props, email, this);
  }

  updatePhone(phone: string): void {
    const updater = new PhoneUpdater();
    updater.update(this.props, phone, this);
  }

  validate() {
    const validator = UserValidatorFactory.create();
    const isValid = validator.validate(this.props);
    if (!isValid) {
      throw new EntityValidationError(validator.errors);
    }
  }

  static validate(props: UserProperties) {
    const validator = UserValidatorFactory.create();
    const isValid = validator.validate(props);
    if (!isValid) {
      throw new EntityValidationError(validator.errors);
    }
  }
}
