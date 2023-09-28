import { Injectable } from '@angular/core';
import { PoPageLogin } from '@po-ui/ng-templates';
import { LoginModel } from 'src/app/pages/auth/login/models/login.model';
import { TokenResponse } from 'src/app/pages/auth/login/models/token-response.model';

const USER_KEY = 'user-key';
const LOGIN_KEY = 'login-key';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  clean(): void {
    localStorage.clear();
  }

  limparTokenAcesso() {
    localStorage.removeItem(USER_KEY);
  }

  salvarTokenAcesso(user: TokenResponse): void {
    localStorage.removeItem(USER_KEY);
    if (user.userSession && user.secretKey) {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    }
  }

  obterTokenAcesso(): TokenResponse {
    const user = localStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }
  }

  usuarioLogado(): boolean {
    const user = localStorage.getItem(USER_KEY);
    if (user) {
      return true;
    }

    return false;
  }

  salvarDadosLogin(login: PoPageLogin) {
    localStorage.removeItem(LOGIN_KEY);
    localStorage.setItem(LOGIN_KEY, JSON.stringify(login));
  }

  obterDadosLogin(): any {
    const user = localStorage.getItem(LOGIN_KEY);
    if (user) {
      return JSON.parse(user);
    }
  }

  limparDadosLogin() {
    localStorage.removeItem(LOGIN_KEY);
  }
}
