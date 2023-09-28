import { Component, Injector, OnInit, ViewEncapsulation } from '@angular/core';
import { PoDialogConfirmLiterals } from '@po-ui/ng-components';
import { FormBaseComponent } from 'src/app/core/components/form-base.component';
import { contaPt } from '../i18n/i18n-config';
import { Usuario } from '../models/usuario.model';
import { ContaService } from '../services/conta.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-conta',
  templateUrl: './conta.component.html',
  styleUrls: ['./conta.component.less'],
  encapsulation: ViewEncapsulation.None,
})
export class ContaComponent extends FormBaseComponent {
  literals = contaPt;

  dataAtual = new Date();
  literalsConfirm!: PoDialogConfirmLiterals;
  loading = false;

  constructor(objInjector: Injector, private servico: ContaService) {
    super(objInjector);
  }

  ngOnInit(): void {}

  cancelar(formulario: FormGroup) {
    if (formulario.dirty && !formulario.pristine) {
      this.poAlert.confirm({
        ...this.literals.telaConfirmacaoSair,
        confirm: () => {
          this.navegarParaTelaLogin();
        },
      });
    }else{
      this.navegarParaTelaLogin();
    }
  }

  navegarParaTelaLogin() {
    this.router.navigate(['/login']);
  }

  criarUsuario(usuario: Usuario) {
    const usuarioEntity = new Usuario(usuario);
    this.loading = true;
    this.loadingHelper.showLoading();
    this.servico
      .cadastrar(usuarioEntity)
      .subscribe({
        next: () => {
          this.navegarParaTelaLogin();
        },
      })
      .add(() => {
        this.loading = false;
        this.loadingHelper.hideLoading();
      });
  }
}
