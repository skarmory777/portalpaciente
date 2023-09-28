import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { PoModule, PoToolbarModule } from '@po-ui/ng-components';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RequestInterceptor } from './core/providers/request.interceptor';
import { AuthModule } from './pages/auth/auth.module';
import { AuthenticationGuard } from './pages/auth/services/authentication.guard';
import { ContaModule } from './pages/conta/conta.module';
import { HomeModule } from './pages/home/home.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './store/reducers';
import { EffectsModule } from '@ngrx/effects';
import { RedefinirSenhaModule } from './pages/redefinir-senha/redefinir-senha.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    PoModule,
    PoToolbarModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HomeModule,
    AuthModule,
    ContaModule,
    RedefinirSenhaModule,
    RouterModule.forRoot([]),
    SharedModule.forRoot(),
    CoreModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
    }),
    EffectsModule.forRoot([]),
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt' },
    { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true },
    AuthenticationGuard,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
