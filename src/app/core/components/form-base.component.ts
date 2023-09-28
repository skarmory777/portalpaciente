import { Directive, Injector } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { NotificationService } from 'src/app/shared/services/notification/notification.service';
import { ComponenteBase } from './componente-base';
import { WindowUtilService } from 'src/app/shared/services/window-util.service';

@Directive()
export abstract class FormBaseComponent extends ComponenteBase {
  protected fb: UntypedFormBuilder;
  protected notification: NotificationService;
  protected windowUtilService: WindowUtilService;

  constructor(objInjector: Injector) {
    super(objInjector);
    this.fb = objInjector.get(UntypedFormBuilder);
    this.windowUtilService = objInjector.get(WindowUtilService);
  }

  voltar() {
    this.windowUtilService.voltar();
  }
}
