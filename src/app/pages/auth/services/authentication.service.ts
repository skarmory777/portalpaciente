import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { BaseHttpService } from 'src/app/core/webapi/base.http.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { LoginModel } from '../login/models/login.model';
import { TokenResponse } from '../login/models/token-response.model';

const REQUEST_AUTH = 'sau-portal/login';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(
    private httpBase: BaseHttpService,
    private storageService: StorageService,
    private router: Router
  ) {}

  login(login: LoginModel): Observable<TokenResponse> {
    this.storageService.clean();
    return this.httpBase.post<any>(REQUEST_AUTH, '?action=login', login).pipe(
      map((response) => {
        return Object.assign(new TokenResponse(), response || {});
      })
    );
  }

  logout(): Observable<void> {
    return this.httpBase.post<any>(REQUEST_AUTH, '?action=logout', undefined).pipe(
      map(() => {
        this.storageService.limparTokenAcesso();
        this.router.navigate(['login']);
      })
    );
  }

  validar(login: LoginModel): Observable<boolean> {
    return this.httpBase.post<any>(`${REQUEST_AUTH}/validate`, null, login);
  }
}
