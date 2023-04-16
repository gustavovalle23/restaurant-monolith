import { Injectable } from '@nestjs/common';
import { DefaultUseCase } from '@/@seedwork';
import { CPF, User } from '../domain/entities';
import { IUSerRepository } from '../domain/contracts';

@Injectable()
export class CreateUserUseCase implements DefaultUseCase<CreateUserInput, CreateUserOutput> {
  constructor(private readonly userRepository: IUSerRepository) { }

  async execute({ birthDate, cpf, name, password }: CreateUserInput): Promise<CreateUserOutput> {
    const user = new User({
      active: true,
      cpf: new CPF({ cpf }),
      createdAt: new Date(),
      updatedAt: new Date(),
      name,
      password,
      birthDate,
    }).toJSON()

    const savedUser = await this.userRepository.create({
      active: user.active,
      birthDate: user.birthDate,
      cpf: user.cpf.value.cpf,
      createdAt: user.createdAt,
      name: user.name,
      password: user.password,
      updatedAt: user.updatedAt
    });

    return {
      ...savedUser.toJSON(),
      cpf: savedUser.toJSON().cpf.value.cpf
    }
  }
}

export type CreateUserInput = { birthDate: Date, cpf: string, name: string, password: string };
export type CreateUserOutput = {
  id: string;
  cpf: string;
  name: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
  birthDate: Date;
  password: string;
};
