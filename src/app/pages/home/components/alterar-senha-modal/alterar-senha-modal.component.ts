import { Component, Injector, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { UntypedFormGroup, Validators } from '@angular/forms';
import { PoModalComponent } from '@po-ui/ng-components';

import { FormBaseComponent } from 'src/app/core/components/form-base.component';
import { requiredIfValidator } from 'src/app/shared/helpers/custom-form-validator.helper';
import { alterarSenhaModalPt } from './i18n/alterar-senha-modal-pt';
import { AlterarSenhaService } from './service/alterar-senha.service';
import { AuthenticationService } from '../../../auth/services/authentication.service';
import AlterarSenhaRequest from './models/alterar-senha-request.model';

@Component({
  selector: 'app-alterar-senha-modal',
  templateUrl: './alterar-senha-modal.component.html',
  styleUrls: ['./alterar-senha-modal.component.less'],
  encapsulation: ViewEncapsulation.None,
})
export class AlterarSenhaModalComponent extends FormBaseComponent implements OnInit {

  form!: UntypedFormGroup;
  literals = alterarSenhaModalPt;

  @ViewChild(PoModalComponent, { static: true })
  poModal: PoModalComponent;

  constructor(
    objInjector: Injector,
    private alterarSenhaService: AlterarSenhaService,
    private authenticationService: AuthenticationService
  ) {
    super(objInjector);
    this.setupForm();
  }

  ngOnInit(): void {
  }

  private setupForm(): void {
    this.form = this.fb.group({
      senhaAtual: [ '', Validators.required ],
      senha: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/),
        ]),
      ],
      confirmacaoSenha: [
        '',
        Validators.compose([
          Validators.required,
          requiredIfValidator(
            () =>
              this.form?.get('senha').value !==
              this.form?.get('confirmacaoSenha').value
          ),
        ]),
      ],
    });
  }

  abrir(): void {
    this.poModal.open();
  }

  confirmar(): void {
    this.loadingHelper.showLoading();

    const alterarSenhaRequest: AlterarSenhaRequest = {
      senhaAtual: this.form.get('senhaAtual').value,
      senha: this.form.get('senha').value,
      confirmacaoSenha: this.form.get('confirmacaoSenha').value,
    };

    this.alterarSenhaService.alterar(alterarSenhaRequest)
      .subscribe(() => this.onSucesso())
      .add(() => this.loadingHelper.hideLoading());
  }

  private onSucesso(): void {
    this.poModal.close();
    this.notification.success(this.literals.mensagemSucesso);

    this.poAlert.alert({
      ...this.literals.telaPosAlteracao,
      ok: () => {
        this.loadingHelper.showLoading();
        this.authenticationService.logout()
          .subscribe()
          .add(() => this.loadingHelper.hideLoading());
      }
    });
  }

}
