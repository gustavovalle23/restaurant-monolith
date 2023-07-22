import { ValueObject } from '@/@seedwork';
import { InvalidEmailError } from '../errors/invalid-email';

type EmailProperties = {
  email: string
}


export class Email extends ValueObject<EmailProperties> {
  private constructor(props: EmailProperties) {
    super(props);
  }

  public static create(email: string): Email {
    if (!Email.isValid(email)) {
      throw new InvalidEmailError(email);
    }

    return new Email({ email });
  }

  public static isValid(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

}
