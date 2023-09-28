import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';
import { cpfInvalido } from '../../helpers/validador-cpf.helper';

@Directive({
  selector: '[appCpfValidator]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: CpfValidatorDirective, multi: true },
  ],
})
export class CpfValidatorDirective implements Validator {
  validate(control: AbstractControl): { [key: string]: any } | null {
    const cpf = control.value;

    if (cpf) {
      const cpfClean = cpf.replace(/\D/g, '');

      if (cpfInvalido(cpfClean)) {
        return { cpfInvalido: true };
      }
    }

    return null;
  }
}
