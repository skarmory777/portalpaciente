import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PoI18nModule, PoLinkModule, PoModule } from '@po-ui/ng-components';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { ContaComponent } from './container/conta.component';
import { contaI18nConfig } from './i18n/i18n-config';

import { ContaGuard } from './services/conta.guard';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { MeuPerfilComponent } from './meu-perfil/meu-perfil.component';
import { DesativarPerfilModalComponent } from './components/desativar-perfil-modal/desativar-perfil-modal.component';

const routes: Routes = [
  {
    path: '',
    component: ContaComponent,
    outlet: 'cadastro',
    pathMatch: 'full',
    canDeactivate: [ContaGuard],
  },
  {
    path: 'meu-perfil',
    component: MeuPerfilComponent,
  },
];

@NgModule({
  declarations: [
    ContaComponent,
    CadastroComponent,
    MeuPerfilComponent,
    DesativarPerfilModalComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    PoModule,
    PoLinkModule,
    SharedModule,
    CoreModule,
    RouterModule.forChild(routes),
    PoI18nModule.config(contaI18nConfig),
  ],
  providers: [ContaGuard],
  exports: [MeuPerfilComponent],
})
export class ContaModule {}
