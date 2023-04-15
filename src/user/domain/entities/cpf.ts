import { ValueObject } from '@/@seedwork';

type CPFProperties = {
  cpf: string
}

export class CPF extends ValueObject<CPFProperties> {
  constructor(props: CPFProperties) {
    super(props);

    if (!CPF.validate(this.value.cpf)) {
      throw new Error('Invalid CPF');
    }
  }

  static validate(value: string): boolean {
    if (value.length !== 11 || !/^\d{11}$/.test(value)) {
      return false;
    }

    const digits = value.split('').map((digit) => parseInt(digit, 10));
    const [d1, d2] = digits.slice(9);

    const sum1 = digits.slice(0, 9).reduce((acc, digit, index) => acc + digit * (10 - index), 0);
    const remainder1 = sum1 % 11;
    const calculated1 = remainder1 < 2 ? 0 : 11 - remainder1;

    if (d1 !== calculated1) {
      return false;
    }

    const sum2 = digits.slice(0, 10).reduce((acc, digit, index) => acc + digit * (11 - index), 0);
    const remainder2 = sum2 % 11;
    const calculated2 = remainder2 < 2 ? 0 : 11 - remainder2;

    if (d2 !== calculated2) {
      return false;
    }

    return true;
  }
}
