export class InvalidCpfError extends Error {
  constructor(cpf: string) {
    super(`Invalid Cpf Error: ${cpf}`);
    this.name = 'InvalidCpfError';
  }
}
