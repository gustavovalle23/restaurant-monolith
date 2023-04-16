import { User } from '../entities';

export abstract class IUSerRepository {
  abstract create(input: CreateUserInput): Promise<User>;
}


export type CreateUserInput = {
    cpf: string;
    name: string;
    active: boolean;
    createdAt: Date;
    updatedAt: Date;
    birthDate: Date;
    password: string;
}