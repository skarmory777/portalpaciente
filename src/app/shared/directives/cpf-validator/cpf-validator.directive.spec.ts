import { CpfValidatorDirective } from './cpf-validator.directive';
import { FormControl } from '@angular/forms';

describe('CpfValidatorDirective', () => {
  let directive: CpfValidatorDirective;

  beforeEach(() => {
    directive = new CpfValidatorDirective();
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should validate valid CPF', () => {
    const control = new FormControl('529.982.247-25');
    const result = directive.validate(control);
    expect(result).toBeNull();
  });

  it('should invalidate CPF with wrong digit verifier', () => {
    const control = new FormControl('529.982.247-24');
    const result = directive.validate(control);
    expect(result).toEqual({ cpfInvalido: true });
  });

  it('should invalidate CPF with invalid format', () => {
    const control = new FormControl('123.456.789-00');
    const result = directive.validate(control);
    expect(result).toEqual({ cpfInvalido: true });
  });
});
