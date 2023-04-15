import { EntityValidationError} from '@/@seedwork';
import { CPF, User, UserProperties } from '@/user/domain/entities';
import { EmailUpdater, PhoneUpdater } from '@/user/domain/updaters';

describe('User', () => {
  const validCpf = new CPF({ cpf: '12345678909' });
  const validDate = new Date();
  const validUserProps: UserProperties = {
    name: 'John Doe',
    birthDate: validDate,
    active: true,
    password: 'password',
    cpf: validCpf,
    email: 'johndoe@example.com',
    phone: '1234567890',
    updatedAt: validDate,
    createdAt: validDate,
  };

  describe('constructor', () => {
    it('creates a User entity instance', () => {
      const user = new User(validUserProps);

      expect(user).toBeInstanceOf(User);
      expect(user.props).toMatchObject(validUserProps);
    });

    it('sets the active property to true if it is not provided', () => {
      const userWithoutActiveProp = {
        ...validUserProps,
        active: undefined,
      };
      const user = new User(userWithoutActiveProp);

      expect(user.props.active).toBe(true);
    });

    it('throws an EntityValidationError if the UserProperties are invalid', () => {
      const invalidUserProps: UserProperties = {
        name: '',
        birthDate: validDate,
        active: true,
        password: '',
        cpf: validCpf,
        email: 'invalid email',
        phone: '',
        updatedAt: validDate,
        createdAt: validDate,
      };

      expect(() => new User(invalidUserProps)).toThrowError(
        EntityValidationError
      );
    });
  });

  describe('deactivate', () => {
    it('sets the active property to false and updatedAt property to the current date', () => {
      const user = new User(validUserProps);
      const prevUpdatedAt = user.props.updatedAt;

      user.deactivate();

      expect(user.props.active).toBe(false);
      expect(user.props.updatedAt).toBeInstanceOf(Date);
      expect(user.props.updatedAt.getTime()).toBeGreaterThan(
        prevUpdatedAt.getTime()
      );
    });

    it('calls validate method', () => {
      const user = new User(validUserProps);
      jest.spyOn(user, 'validate');

      user.deactivate();

      expect(user.validate).toHaveBeenCalled();
    });
  });

  describe('updateEmail', () => {
    it('calls EmailUpdater.update method with the correct arguments', () => {
      const user = new User(validUserProps);
      const updater = new EmailUpdater();
      jest.spyOn(updater, 'update');

      user.updateEmail('newemail@example.com');

      expect(updater.update).toHaveBeenCalledWith(
        user.props,
        'newemail@example.com',
        user
      );
    });
  });

  describe('updatePhone', () => {
    it('calls PhoneUpdater.update method with the correct arguments', () => {
      const user = new User(validUserProps);
      const updater = new PhoneUpdater();
      jest.spyOn(updater, 'update');

      user.updatePhone('9876543210');

      expect(updater.update).toHaveBeenCalledWith(
        user.props,
        '9876543210',
        user
      );
    });
  });

  describe('validate', () => {
    test('should not throw an error for a valid user', () => {
      const validUserPropsValidate = {
        name: 'John Doe',
        birthDate: new Date(1990, 1, 1),
        active: true,
        password: 'password',
        cpf: new CPF({cpf: '12345678901'}),
        email: 'john.doe@example.com',
        phone: '123456789',
        updatedAt: new Date(),
        deletedAt: undefined,
        createdAt: new Date(),
      };

      expect(() => User.validate(validUserPropsValidate)).not.toThrow();
    });

    test('should throw an error for a user with invalid properties', () => {
      const invalidUserProps = {
        name: 'John Doe',
        birthDate: new Date(2010, 1, 1),
        active: undefined,
        password: '1234',
        cpf: new CPF({cpf: 'invalid-cpf'}),
        email: 'invalid-email',
        phone: 'invalid-phone',
        updatedAt: new Date(),
        deletedAt: undefined,
        createdAt: new Date(),
      };

      expect(() => User.validate(invalidUserProps)).toThrow(EntityValidationError);
    });

    test('should throw an error with correct validation errors for a user with invalid properties', () => {
      const invalidUserProps = {
        name: 'John Doe',
        birthDate: new Date(2010, 1, 1),
        active: undefined,
        password: '1234',
        cpf: new CPF({cpf: '84092175035'}),
        email: 'invalid-email',
        phone: 'invalid-phone',
        updatedAt: new Date(),
        deletedAt: undefined,
        createdAt: new Date(),
      };

      try {
        User.validate(invalidUserProps);
      } catch (error) {
        expect(error).toBeInstanceOf(EntityValidationError);
        expect(error.errors).toHaveLength(5);
        expect(error.errors[1].field).toBe('email');
        expect(error.errors[1].message).toBe('Invalid email');
        expect(error.errors[2].field).toBe('phone');
        expect(error.errors[2].message).toBe('Invalid phone');
        expect(error.errors[3].field).toBe('password');
        expect(error.errors[3].message).toBe('Password must be at least 6 characters long');
        expect(error.errors[4].field).toBe('birthDate');
        expect(error.errors[4].message).toBe('Invalid birth date');
      }
    });
  });
}
)
