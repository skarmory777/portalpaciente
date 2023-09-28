import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PoModule } from '@po-ui/ng-components';

import { SharedModule } from 'src/app/shared/shared.module';
import { RedefinirSenhaComponent } from './redefinir-senha.component';

const routes: Routes = [
  {
    path: '',
    component: RedefinirSenhaComponent,
    outlet: 'login',
    pathMatch: 'full',
  },
];

@NgModule({
  declarations: [RedefinirSenhaComponent],
  imports: [
    CommonModule,
    PoModule,
    SharedModule,
    RouterModule.forChild(routes),
  ],
  exports: [RedefinirSenhaComponent],
})
export class RedefinirSenhaModule {}
