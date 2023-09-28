import { Injectable, Injector } from '@angular/core';
import { CanActivate, CanDeactivate } from '@angular/router';
import { BaseGuard } from 'src/app/shared/services/base.guard';
import { ContaComponent } from '../container/conta.component';

@Injectable()
export class ContaGuard
  extends BaseGuard
  implements CanDeactivate<ContaComponent>, CanActivate
{
  constructor(objInjector: Injector) {
    super(objInjector);
  }

  canDeactivate(component: ContaComponent) {
    return true;
  }

  canActivate() {
    if (this.storageService.usuarioLogado()) {
      this.router.navigate(['/home']);
    }

    return true;
  }
}
