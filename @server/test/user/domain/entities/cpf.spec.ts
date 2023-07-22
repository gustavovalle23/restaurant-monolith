import { CPF } from '@/user/domain/entities';
import { InvalidCpfError } from '@/user/domain/errors';

describe('CPF', () => {
  describe('constructor', () => {
    it('should create a CPF instance when a valid cpf is provided', () => {
      const cpf = new CPF({ cpf: '12345678909' });
      expect(cpf).toBeDefined();
    });

    it('should throw an InvalidCpfError when an invalid cpf is provided', () => {
      expect(() => {
        const cpf = new CPF({ cpf: '12345678901' });
        throw new Error(`got another error for invalid ${cpf}`)
      }).toThrow(InvalidCpfError);
    });
  });

  describe('isValid', () => {
    it('should return true for a valid cpf', () => {
      expect(CPF.isValid('12345678909')).toBe(true);
    });

    it('should return false for an invalid cpf with less than 11 digits', () => {
      expect(CPF.isValid('1234567890')).toBe(false);
    });

    it('should return false for an invalid cpf with more than 11 digits', () => {
      expect(CPF.isValid('123456789012')).toBe(false);
    });

    it('should return false for an invalid cpf with non-numeric characters', () => {
      expect(CPF.isValid('1234567890a')).toBe(false);
    });

    it('should return false for an invalid cpf with incorrect check digits', () => {
      expect(CPF.isValid('12345678901')).toBe(false);
    });
  });
});
