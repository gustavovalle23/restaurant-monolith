import { CPF } from "./value-objects";

export class User {
  readonly name: string;
  readonly birthDate: Date;
  readonly active: boolean;
  readonly cpf: CPF;
  readonly updatedAt: Date;
  readonly deletedAt?: Date;
  readonly createdAt: Date;
  readonly email?: string;
  readonly phone?: string;

  constructor(
    name: string,
    birthDate: Date,
    active: boolean,
    cpf: CPF,
    updatedAt?: Date,
    deletedAt?: Date,
    createdAt?: Date,
    email?: string,
    phone?: string
  ) {
    this.name = name;
    this.birthDate = birthDate;
    this.active = active;
    this.cpf = cpf;
    this.updatedAt = updatedAt ?? new Date();
    this.deletedAt = deletedAt;
    this.createdAt = createdAt ?? new Date();
    this.email = email;
    this.phone = phone;
  }
}
