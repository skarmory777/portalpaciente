import {
  Component,
  EventEmitter,
  Output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import {
  PoToolbarAction,
  PoToolbarProfile,
} from '@po-ui/ng-components';

import { AlterarSenhaModalComponent } from '../alterar-senha-modal/alterar-senha-modal.component';
import { BarraFerramentasPt } from './i18n/barra-ferramentas-pt';

@Component({
  selector: 'app-barra-ferramentas',
  templateUrl: './barra-ferramentas.component.html',
  styleUrls: ['./barra-ferramentas.component.less'],
  encapsulation: ViewEncapsulation.None,
})
export class BarraFerramentasComponent {
  @Output('sair') logoutEvento = new EventEmitter();
  @Output('ir-para') navegarParaEvento = new EventEmitter<string>();
  literals = BarraFerramentasPt;
  profile: PoToolbarProfile = {
    ...this.literals.perfil,
  };

  @ViewChild('alterarSenhaModal')
  alterarSenhaModal: AlterarSenhaModalComponent;

  profileActions: Array<PoToolbarAction> = [
    {
      icon: 'po-icon-user',
      label: this.literals.acoes.meuPerfil,
      action: () => this.navegarParaEvento.emit('cadastro/meu-perfil'),
    },
    {
      icon: 'po-icon-lock',
      label: this.literals.acoes.alterarSenha,
      separator: true,
      action: () => this.alterarSenhaModal.abrir(),
    },
    {
      icon: 'po-icon-settings',
      label: this.literals.acoes.configuracoesPrivacidade,
      separator: true,
      action: (item: PoToolbarAction) => () => {},
    },
    {
      icon: 'po-icon-exit',
      label: 'Sair',
      type: 'danger',
      separator: true,
      action: (item: PoToolbarAction) => this.logoutEvento.emit(),
    },
  ];

  notificacoes: Array<PoToolbarAction> = [
    {
      label:
        'Lembrete: Consulta Dermatologia agendada para 07/01/2023 - 08:30  (Amanhã)',
      action: (item: any) => {
        item.type = 'default';
      },
      type: 'danger',
    },
    {
      label:
        'Agendamento: Consulta - Dermatologia - agendada para 17/01/2023 - 10:00',
      action: (item: any) => this.openDialog(item),
      type: 'danger',
    },
  ];

  constructor() {}

  openDialog(item: PoToolbarAction) {
    item.type = 'default';
  }

  contadorNotificacoes() {
    return this.notificacoes.filter((not) => not.type === 'danger').length;
  }
}
