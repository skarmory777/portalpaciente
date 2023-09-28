import { Directive, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from './storage.service';

@Directive()
export abstract class BaseGuard {
  protected router: Router;
  protected storageService: StorageService;

  constructor(objInjector: Injector) {
    this.router = objInjector.get(Router);
    this.storageService = objInjector.get(StorageService);
  }

  protected usuarioLogado(): boolean {
    if (!this.storageService.usuarioLogado()) {
      this.navegarLogin();
      return false;
    }

    return true;
  }

  private navegarLogin() {
    this.router.navigate(['/login']);
  }
}
