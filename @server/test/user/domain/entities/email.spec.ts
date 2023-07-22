import { Email } from '@/user/domain/entities';
import { InvalidEmailError } from '@/user/domain/errors';

describe('Email', () => {
  describe('create', () => {
    it('should create a new Email instance when a valid email is provided', () => {
      const email = Email.create('test1@example.com');
      expect(email).toBeDefined();
    });

    it('should throw an InvalidEmailError when an invalid email is provided', () => {
      expect(() => {
        Email.create('invalid-email');
      }).toThrow(InvalidEmailError);
    });
  });

  describe('isValid', () => {
    it('should return true for a valid email', () => {
      const result = Email.isValid('test@example.com');
      expect(result).toBe(true);
    });

    it('should return false for an email without @ symbol', () => {
      const result = Email.isValid('test.example.com');
      expect(result).toBe(false);
    });

    it('should return false for an email without domain', () => {
      const result = Email.isValid('test@');
      expect(result).toBe(false);
    });

    it('should return false for an email with whitespace', () => {
      const result = Email.isValid('test@example.com  ');
      expect(result).toBe(false);
    });
  });
});
