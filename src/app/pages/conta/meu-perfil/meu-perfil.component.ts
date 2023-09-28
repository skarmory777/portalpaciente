import {
  Component,
  Injector,
  AfterViewInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { FormBaseComponent } from 'src/app/core/components/form-base.component';
import { Usuario } from '../models/usuario.model';
import { ContaService } from '../services/conta.service';
import { MeuPerfilPt } from './i18n/meu-perfil-pt';
import { FormGroup } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/store/reducers';
import { obterUsuario } from 'src/app/store/selectors';
import { filter } from 'rxjs';
import * as moment from 'moment';
import { DesativarPerfilModalComponent } from '../components/desativar-perfil-modal/desativar-perfil-modal.component';
import { AuthenticationService } from '../../auth/services/authentication.service';
import { CadastroComponent } from '../components/cadastro/cadastro.component';

@Component({
  selector: 'app-meu-perfil',
  templateUrl: './meu-perfil.component.html',
  styleUrls: ['./meu-perfil.component.less'],
  encapsulation: ViewEncapsulation.None,
})
export class MeuPerfilComponent
  extends FormBaseComponent
  implements AfterViewInit
{
  literals = MeuPerfilPt;
  usuario!: Usuario;

  @ViewChild('cadastro')
  formularioCadastro: CadastroComponent;

  @ViewChild('desativarPerfilModal')
  desativarPerfilModal: DesativarPerfilModalComponent;

  constructor(
    objInjector: Injector,
    private contaServico: ContaService,
    private store: Store<AppState>,
    private authenticationService: AuthenticationService
  ) {
    super(objInjector);
    this.store
      .pipe(
        select(obterUsuario),
        filter((usuario) => !!usuario)
      )
      .subscribe((usuario) => {
        this.usuario = new Usuario(usuario);
        this.usuario.dataNascimento = moment(usuario.dataNascimento).toDate();
      });
  }

  ngOnInit() {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.formularioCadastro.form.markAsPristine();
    });
  }

  cancelar(formulario: FormGroup) {
    if (this.isFormularioAlterado(formulario)) {
      this.poAlert.confirm({
        ...this.literals.telaConfirmacaoSair,
        confirm: () => {
          this.voltar();
        },
      });
    } else {
      this.voltar();
    }
  }

  alterarDados(formulario: FormGroup): void {
    if (this.isFormularioAlterado(formulario)) {
      this.poAlert.confirm({
        ...this.literals.telaConfirmacaoAlterarDados,
        confirm: () => {
          const usuario = new Usuario(formulario.value);
          this.confirmarAlteracaoDados(usuario);
        },
      });
    }
  }

  private confirmarAlteracaoDados(usuario: Usuario): void {
    this.loadingHelper.showLoading();
    this.contaServico
      .alterar(usuario)
      .subscribe(() => {
        this.formularioCadastro.form.markAsPristine();
        this.notification.success(this.literals.mensagemAlterarDadosSucesso);
      })
      .add(() => this.loadingHelper.hideLoading());
  }

  private isFormularioAlterado(formulario: FormGroup): boolean {
    return formulario.dirty && !formulario.pristine;
  }

  confirmarDesativarPerfil(): void {
    this.desativarPerfilModal.abrir();
  }

  desativarPerfil(isUsuarioValido: boolean): void {
    if (isUsuarioValido) {
      this.loadingHelper.showLoading();

      this.contaServico.desativar().subscribe(() => {
        this.notification.success(this.literals.mensagemDesativarPerfilSucesso);
        this.authenticationService
          .logout()
          .subscribe()
          .add(() => this.loadingHelper.hideLoading());
      });
    }
  }
}
