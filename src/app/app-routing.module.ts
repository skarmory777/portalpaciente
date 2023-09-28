import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from './pages/auth/services/authentication.guard';
import { HomeComponent } from './pages/home/container/home.component';
import { HomeGuard } from './pages/home/service/home.guard';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomeModule),
    canActivate: [HomeGuard],
  },
  {
    path: 'agendamento',
    loadChildren: () =>
      import('./pages/agendamento/agendamento.module').then(
        (m) => m.AgendamentoModule
      ),
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'cadastro',
    loadChildren: () =>
      import('./pages/conta/conta.module').then((m) => m.ContaModule),
  },
  {
    path: 'redefinir-senha/:token',
    loadChildren: () =>
      import('./pages/redefinir-senha/redefinir-senha.module').then(
        (m) => m.RedefinirSenhaModule
      ),
  },
  { path: '**', component: HomeComponent, canActivate: [AuthenticationGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
