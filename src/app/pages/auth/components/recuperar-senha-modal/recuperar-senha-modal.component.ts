import { Component, Injector, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { UntypedFormGroup, Validators } from '@angular/forms';
import { PoModalComponent } from '@po-ui/ng-components';

import { FormBaseComponent } from 'src/app/core/components/form-base.component';
import { recuperarSenhaModalPt } from './i18n/recuperar-senha-modal-pt';
import { RecuperarSenhaService } from './service/recuperar-senha.service';
import RecuperarSenhaRequest from './models/recuperar-senha-request.model';

@Component({
  selector: 'app-recuperar-senha-modal',
  templateUrl: './recuperar-senha-modal.component.html',
  styleUrls: ['./recuperar-senha-modal.component.less'],
  encapsulation: ViewEncapsulation.None,
})
export class RecuperarSenhaModalComponent extends FormBaseComponent implements OnInit {

  literals = recuperarSenhaModalPt;
  form!: UntypedFormGroup;
  dataAtual: Date = new Date();
  emailInformado: string = '';

  @ViewChild(PoModalComponent, { static: true })
  poModal: PoModalComponent;

  constructor(
    objInjector: Injector,
    private recuperarSenhaService: RecuperarSenhaService
  ) {
    super(objInjector);
   }

  ngOnInit(): void {
    this.setupForm();
  }

  abrir(): void {
    this.poModal.onXClosed?.subscribe(() => this.limparFormulario());
    this.poModal.open();
  }

  confirmar() {
    this.loadingHelper.showLoading();
    this.emailInformado = this.form.get('email').value;

    const recuperarSenhaRequest: RecuperarSenhaRequest = {
      cpf: this.form.get('cpf').value,
      dataNascimento: this.form.get('dataNascimento').value,
      email: this.form.get('email').value,
    };

    this.recuperarSenhaService.recuperar(recuperarSenhaRequest)
      .subscribe(() => this.onEmailEnviado())
      .add(() => this.loadingHelper.hideLoading());
  }

  private setupForm(): void {
    this.form = this.fb.group({
      cpf: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(11),
          Validators.maxLength(11),
        ]),
      ],
      dataNascimento: [undefined, Validators.required],
      email: ['', Validators.required],
    });
  }

  private limparFormulario(): void {
    this.form.reset();
  }

  private onEmailEnviado(): void {
    this.poModal.close();
    this.notification.success(this.literals.mensagemEmailEnviado);

    this.literals.telaPosEmailEnviado.message = this.literals.telaPosEmailEnviado.message
      .replace('@EMAIL_INFORMADO@', this.emailInformado);

    this.poAlert.alert({
      ...this.literals.telaPosEmailEnviado,
    });
  }
}
