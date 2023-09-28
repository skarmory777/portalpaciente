import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PoModule } from '@po-ui/ng-components';
import { PoPageLoginModule } from '@po-ui/ng-templates';
import { LoginComponent } from './login/login.component';
import { RecuperarSenhaModalComponent } from './components/recuperar-senha-modal/recuperar-senha-modal.component';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    outlet: 'login',
    pathMatch: 'full',
  },
];

@NgModule({
  declarations: [LoginComponent, RecuperarSenhaModalComponent],
  imports: [
    CommonModule,
    PoModule,
    PoPageLoginModule,
    SharedModule,
    RouterModule.forChild(routes),
  ],
  exports: [LoginComponent, RecuperarSenhaModalComponent],
})
export class AuthModule {}
