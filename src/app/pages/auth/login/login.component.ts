import {
  AfterContentInit,
  Component,
  Injector,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { PoLanguage } from '@po-ui/ng-components';
import {
  PoPageLogin,
  PoPageLoginComponent,
} from '@po-ui/ng-templates';

import { StorageService } from 'src/app/shared/services/storage.service';
import { AuthenticationService } from '../services/authentication.service';
import { loginPt } from './i18n/login-pt';
import { LoginModel } from './models/login.model';
import { TokenResponse } from './models/token-response.model';
import { ComponenteBase } from 'src/app/core/components/componente-base';
import { RecuperarSenhaModalComponent } from '../components/recuperar-senha-modal/recuperar-senha-modal.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent
  extends ComponenteBase
  implements OnInit, AfterContentInit
{
  @ViewChild(PoPageLoginComponent)
  loginComponente: PoPageLoginComponent;

  @ViewChild('recuperarSenhaModal')
  recuperarSenhaModal: RecuperarSenhaModalComponent

  literals = loginPt;
  loading: boolean = false;
  attempts = 3;
  exceededAttempts: number;

  readonly languages: Array<PoLanguage> = [
    { language: 'pt', description: 'Português' },
  ];

  recuperarSenha(): void {
    this.recuperarSenhaModal.abrir();
  }

  constructor(
    objInjector: Injector,
    private servico: AuthenticationService,
    private storageService: StorageService
  ) {
    super(objInjector);
  }

  ngOnInit(): void {
    this.exceededAttempts = 0;
  }

  ngAfterContentInit(): void {
    this.carregarDadosLogin();
  }

  carregarDadosLogin() {
    setTimeout(() => {
      const login = this.storageService.obterDadosLogin();
      if (login) this.loginComponente.loginForm.form.patchValue(login);
    });
  }

  login(formData: PoPageLogin) {
    const { login, password } = formData;

    if (!Number(login)) {
      this.notification.error(this.literals.loginErrors);
    } else if (login && password) {
      const model = new LoginModel({
        cpf: login,
        senha: password,
      });

      this.loading = true;
      this.servico
        .login(model)
        .subscribe({
          next: (resposta) => {
            if (resposta) {
              this.loginSucesso(resposta, formData);
            }
          },
          error: (error) => {
            this.loginErro(error);
          },
        })
        .add(() => (this.loading = false));
    }
  }

  loginSucesso(resposta: TokenResponse, formData: PoPageLogin) {
    this.exceededAttempts = 0;
    const token = <TokenResponse>{
      secretKey: resposta.secretKey,
      userSession: resposta.userSession,
    };
    this.salvarChave(token);
    this.gravarDadosLogin(formData);
    this.router.navigateByUrl('home');
  }

  loginErro(error: any) {
    if (this.attempts >= 1) {
      this.attempts--;
      this.exceededAttempts = this.attempts;
    }
  }

  gravarDadosLogin(formData: PoPageLogin) {
    if (formData.rememberUser) {
      this.storageService.salvarDadosLogin(formData);
    } else {
      this.storageService.limparDadosLogin();
    }
  }

  salvarChave(resposta: TokenResponse) {
    this.storageService.salvarTokenAcesso(resposta);
  }
}
