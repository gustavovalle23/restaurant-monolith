import { IUSerRepository } from '@/user/domain/contracts';
import { CPF, User } from '@/user/domain/entities';
import { CreateUserInput, CreateUserOutput, CreateUserUseCase } from '@/user/use-cases';

describe('CreateUserUseCase', () => {
  let userRepository: IUSerRepository;
  let createUserUseCase: CreateUserUseCase;

  beforeEach(() => {
    userRepository = {
      create: jest.fn(),
    };
    createUserUseCase = new CreateUserUseCase(userRepository);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should create a user', async () => {
    const input: CreateUserInput = {
      birthDate: new Date(),
      cpf: '123.456.789-10',
      name: 'John Doe',
      password: 'password123',
    };

    const user = new User({
      active: true,
      cpf: new CPF({ cpf: input.cpf }),
      createdAt: new Date(),
      updatedAt: new Date(),
      name: input.name,
      password: input.password,
      birthDate: input.birthDate,
    });
    const expectedOutput: CreateUserOutput = {
      cpf: user.props.cpf.value.cpf,
      name: user.props.name,
      active: user.props.active,
      createdAt: user.props.createdAt,
      updatedAt: user.props.updatedAt,
      birthDate: user.props.birthDate,
      password: user.props.password,
    };

    userRepository.create = jest.fn().mockResolvedValue(user);

    const output = await createUserUseCase.execute(input);

    expect(userRepository.create).toHaveBeenCalledWith({
      active: true,
      cpf: input.cpf,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
      name: input.name,
      password: input.password,
      birthDate: input.birthDate,
    });
    expect(output).toEqual(expectedOutput);
  });
});
