import { ClassValidatorFields } from '@/@seedwork/src/domain/validators';
import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { UserProperties } from '../entities';

export class UserRules {
  @IsString()
  @IsNotEmpty()
  cpf: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsBoolean()
  active: boolean;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsDate()
  birthDate: Date;

  @IsDate()
  createdAT: Date;

  @IsDate()
  @IsOptional()
  updatedAt?: Date;

  @IsDate()
  @IsOptional()
  deletedAt?: Date;


  constructor({
    cpf,
    name,
    phone,
    email,
    active,
    password,
    birthDate,
    updatedAt,
    deletedAt,
    createdAt,
  }: UserProperties) {
    Object.assign(this, {
      name,
      birthDate,
      active,
      password,
      cpf,
      updatedAt,
      deletedAt,
      createdAt,
      email,
      phone,
    });
  }
}

export class UserValidator extends ClassValidatorFields<UserRules> {
  validate(data: UserProperties): boolean {
    return super.validate(new UserRules(data ?? ({} as never)));
  }
}

export class UserValidatorFactory {
  static create() {
    return new UserValidator();
  }
}
