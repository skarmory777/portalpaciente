import { Injectable, Injector, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PoDialogService } from '@po-ui/ng-components';
import { NotificationService } from 'src/app/shared/services/notification/notification.service';
import { LoadingHelper } from '../helpers/loading.helper';

@Injectable()
export abstract class ComponenteBase implements OnInit {
  protected poAlert: PoDialogService;
  protected router: Router;
  protected notification: NotificationService;
  protected loadingHelper: LoadingHelper;
  protected activatedRoute: ActivatedRoute;

  constructor(objInjector: Injector) {
    this.poAlert = objInjector.get(PoDialogService);
    this.router = objInjector.get(Router);
    this.notification = objInjector.get(NotificationService);
    this.loadingHelper = objInjector.get(LoadingHelper);
    this.activatedRoute = objInjector.get(ActivatedRoute);
  }

  ngOnInit(): void {}
}
