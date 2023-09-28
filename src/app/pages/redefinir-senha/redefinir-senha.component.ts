import {
  AfterViewInit,
  Component,
  Injector,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { UntypedFormGroup, Validators } from '@angular/forms';
import { PoModalComponent } from '@po-ui/ng-components';

import { FormBaseComponent } from 'src/app/core/components/form-base.component';
import { requiredIfValidator } from 'src/app/shared/helpers/custom-form-validator.helper';
import { redefinirSenhaPt } from './i18n/redefinir-senha-pt';
import { RedefinirSenhaService } from './service/redefinir-senha.service';
import RedefinirSenhaRequest from './models/redefinir-senha-request.model';

@Component({
  selector: 'app-redefinir-senha',
  templateUrl: './redefinir-senha.component.html',
  styleUrls: ['./redefinir-senha.component.less'],
  encapsulation: ViewEncapsulation.None,
})
export class RedefinirSenhaComponent
  extends FormBaseComponent
  implements OnInit, AfterViewInit
{
  form!: UntypedFormGroup;
  literals = redefinirSenhaPt;

  @ViewChild(PoModalComponent, { static: true })
  poModal: PoModalComponent;

  constructor(
    objInjector: Injector,
    private redefinirSenhaService: RedefinirSenhaService
  ) {
    super(objInjector);
    this.setupForm();
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.poModal.onXClosed?.subscribe(() => this.redirecionarParaLogin());
      this.poModal.open();
    });
  }

  redefinirSenha(): void {
    this.loadingHelper.showLoading();

    const redefinirSenhaRequest: RedefinirSenhaRequest = {
      senha: this.form.get('senha').value,
      confirmacaoSenha: this.form.get('confirmacaoSenha').value,
      token: this.activatedRoute.snapshot.params.token,
    };

    this.redefinirSenhaService
      .redefinir(redefinirSenhaRequest)
      .subscribe(() => this.onSucesso())
      .add(() => this.loadingHelper.hideLoading());
  }

  private onSucesso(): void {
    this.poModal.close();
    this.notification.success(this.literals.mensagemSucesso);

    this.poAlert.confirm({
      ...this.literals.telaPosRedefinicao,
      confirm: () => this.redirecionarParaLogin(),
      close: () => this.redirecionarParaLogin(),
    });
  }

  private redirecionarParaLogin(): void {
    this.router.navigate(['login']);
  }

  private setupForm(): void {
    this.form = this.fb.group({
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
}
