import { Component, Injector, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';

import { ComponenteBase } from 'src/app/core/components/componente-base';
import { senhaChecklistPt } from './i18n/senha-checklist-pt';

export default interface ItensChecklit {
  regex: string;
  texto: string;
}

@Component({
  selector: 'app-senha-checklist',
  templateUrl: './senha-checklist.component.html',
  styleUrls: ['./senha-checklist.component.less'],
  encapsulation: ViewEncapsulation.None,
})
export class SenhaChecklistComponent extends ComponenteBase implements OnInit {

  @Input('form') form: UntypedFormGroup;

  literals = senhaChecklistPt;
  itensChecklist: Array<ItensChecklit>;

  constructor(objInjector: Injector) {
    super(objInjector);
  }

  ngOnInit(): void {
    this.iniciarItensChecklist();
  }

  private iniciarItensChecklist(): void {
    this.itensChecklist = [
      {
        regex: '.{8,}',
        texto: this.literals.checklist.quantidadeMinimaCaracteres,
      },
      {
        regex: '(?=.*[A-Z])',
        texto: this.literals.checklist.quantidadeLetraMaiscula,
      },
      {
        regex: '(?=.*[a-z])',
        texto: this.literals.checklist.quantidadeLetraMinuscula,
      },
      {
        regex: '(?=.*[0-9])',
        texto: this.literals.checklist.quantidadeCaracteresNumericos,
      },
    ];
  }

  isItemInvalido(regex: any) {
    const senha = this.form?.get('senha').value;

    if (senha) {
      const pattern = new RegExp(regex);
      return !pattern.test(senha);
    }
    return false;
  }

}
