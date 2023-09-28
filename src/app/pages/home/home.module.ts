import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './container/home.component';
import { HomeGuard } from './service/home.guard';
import {
  PoModule,
  PoToolbarModule,
  PoWidgetModule,
} from '@po-ui/ng-components';
import { BarraFerramentasComponent } from './components/barra-ferramentas/barra-ferramentas.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { HomeResolver } from './service/home.resolver';
import { AlterarSenhaModalComponent } from './components/alterar-senha-modal/alterar-senha-modal.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    outlet: 'home',
    pathMatch: 'full',
    resolve: {
      usuario: HomeResolver,
    },
  },
];

@NgModule({
  declarations: [
    DashboardComponent,
    HomeComponent,
    BarraFerramentasComponent,
    AlterarSenhaModalComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    PoModule,
    PoToolbarModule,
    PoWidgetModule,
    CommonModule,
    SharedModule,
  ],
  exports: [HomeComponent, BarraFerramentasComponent],
  providers: [HomeGuard, HomeResolver],
})
export class HomeModule {}
