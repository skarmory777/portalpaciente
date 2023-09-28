import {
  Component,
  EventEmitter,
  Injector,
  Input,
  OnInit,
  Output,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { PoModalComponent } from '@po-ui/ng-components';
import { Observable } from 'rxjs';
import { ComponenteBase } from 'src/app/core/components/componente-base';
import { LoginModel } from 'src/app/pages/auth/login/models/login.model';
import { AuthenticationService } from 'src/app/pages/auth/services/authentication.service';
import { Usuario } from '../../models/usuario.model';
import { desativarPerfilModalPt } from './i18n/desativar-perfil-modal-pt';

@Component({
  selector: 'app-desativar-perfil-modal',
  templateUrl: './desativar-perfil-modal.component.html',
  styleUrls: ['./desativar-perfil-modal.component.less'],
  encapsulation: ViewEncapsulation.None,
})
export class DesativarPerfilModalComponent extends ComponenteBase implements OnInit {

  literals = desativarPerfilModalPt;
  senha: string;

  @Input('usuario')
  usuario: Usuario;

  @Output() permiteDesativerPerfil = new EventEmitter<boolean>();

  @ViewChild(PoModalComponent, { static: true })
  poModal: PoModalComponent;

  constructor(
    objInjector: Injector,
    private authenticationService: AuthenticationService
  ) {
    super(objInjector);
  }

  ngOnInit(): void {
  }

  abrir(): void {
    this.poModal.open();
  }

  cancelar(): void {
    this.poModal.close();
  }

  confirmar(): void {
    this.loadingHelper.showLoading();

    this.confirmarUsuario()
      .subscribe((isUsuarioValido) => {
        if (!isUsuarioValido) {
          return this.notification.error(this.literals.mensagemSenhaAtualInvalida);
        }
        this.permiteDesativerPerfil.emit(isUsuarioValido);
        this.poModal.close();
      })
      .add(() => this.loadingHelper.hideLoading());
  }

  private confirmarUsuario(): Observable<boolean> {
    const loginModel = new LoginModel({
      cpf: this.usuario.cpf,
      senha: this.senha,
    });
    return this.authenticationService.validar(loginModel);
  }
}
