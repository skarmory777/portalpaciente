import { Injectable, Injector } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { BaseGuard } from 'src/app/shared/services/base.guard';

@Injectable()
export class AuthenticationGuard extends BaseGuard implements CanActivate {
  constructor(objInjector: Injector) {
    super(objInjector);
  }

  canActivate(routeAc: ActivatedRouteSnapshot) {
    return super.usuarioLogado();
  }
}
