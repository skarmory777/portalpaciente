import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, map, throwError } from 'rxjs';
import { NotificationService } from 'src/app/shared/services/notification/notification.service';
import { StorageService } from 'src/app/shared/services/storage.service';

const statusCodesErro = [400, 401, 403, 404, 409, 422, 500];
const error400Codes = statusCodesErro.filter(
  (code) => code >= 400 && code <= 499
);
const mensagemSessaoInvalidaExpirada = 'Sessão inválida ou expirada.';
const URI_IGNORAR_HEADERS = [ 'action=login', 'signup', 'password-recovery' ];

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  constructor(
    private storageService: StorageService,
    private router: Router,
    private notification: NotificationService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    request = this.adicionarChaveSecreta(request);
    return next.handle(request).pipe(
      map((event) => {
        if (event instanceof HttpResponse && event.body) {
          const body = event.body;
          if (body && (<any>body)._result !== undefined) {
            const newResponse = event.clone({ body: (<any>body)._result });
            return newResponse;
          }
        }
      }),
      catchError((error: HttpErrorResponse) => {
        if (
          error400Codes.some((code) => (code = error.status)) &&
          this.seTokenExpirado(error)
        ) {
          return this.deslogarEIrParaLogin(error);
        }

        return throwError(() => error);
      })
    );
  }

  private seTokenExpirado(error: HttpErrorResponse) {
    return (
      error.url &&
      error.url.indexOf('login') === -1 &&
      error.error?.Message?.includes(mensagemSessaoInvalidaExpirada)
    );
  }
  private deslogarEIrParaLogin(error: HttpErrorResponse) {
    this.storageService.limparTokenAcesso();
    this.notification.exception(error);
    this.router.navigateByUrl('login');
    return throwError(() => error);
  }

  private adicionarChaveSecreta(req: HttpRequest<unknown>) {
    const user = this.storageService.obterTokenAcesso();
    if (!URI_IGNORAR_HEADERS.find(uri => req.url.includes(uri))) {
      req = req.clone({
        setHeaders: {
          'Secret-Key': user.secretKey,
          'User-Session': user.userSession,
        },
      });
    }

    return req;
  }
}
