export class InvalidEmailError extends Error {
  constructor(email: string) {
    super(`Invalid Email Error: ${email}`);
    this.name = 'InvalidEmailError';
  }
}
