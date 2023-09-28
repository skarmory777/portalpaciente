import { Component, Injector, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { PoStepperComponent } from '@po-ui/ng-components';

import { ComponenteBase } from 'src/app/core/components/componente-base';
import { WindowUtilService } from 'src/app/shared/services/window-util.service';
import { agendarPt } from '../i18n/agendar-pt';

@Component({
  selector: 'app-agendamento',
  templateUrl: './agendamento.component.html',
  styleUrls: ['./agendamento.component.less'],
  encapsulation: ViewEncapsulation.None,
})
export class AgendamentoComponent extends ComponenteBase implements OnInit {

  literals: any = agendarPt;

  @ViewChild(PoStepperComponent, { static: true })
  stepper: PoStepperComponent

  constructor(
    objInjector: Injector,
    private windowUtilService: WindowUtilService
  ) {
    super(objInjector);
  }

  ngOnInit() {
  }

  voltar(): void {
    if (this.isPrimeiraEtapa()) {
      return this.windowUtilService.voltar();
    }
    this.stepper.previous();
  }

  proximo(): void {
    this.stepper.next();
  }

  private isPrimeiraEtapa(): boolean {
    return 'active' === this.stepper.poSteps.first.status.toLowerCase();
  }

  isUltimaEtapa(): boolean {
    if (!this.stepper.poSteps) {
      return false;
    }
    return 'active' === this.stepper.poSteps.last.status.toLowerCase();
  }

  concluir(): void {
    //TODO: confirmar marcação
  }

}
