import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AgendamentoComponent } from './container/agendamento.component';

const routes: Routes = [
  {
    path: '',
    component: AgendamentoComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    SharedModule,
    RouterModule.forChild(routes),
  ],
  declarations: [AgendamentoComponent],
})
export class AgendamentoModule {}
