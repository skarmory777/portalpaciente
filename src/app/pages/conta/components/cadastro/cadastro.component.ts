import {
  ChangeDetectionStrategy,
  Component,
  Injector,
  Input,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { AbstractControl, UntypedFormGroup, Validators } from '@angular/forms';
import { PoComboOption, PoDialogConfirmLiterals } from '@po-ui/ng-components';

import { FormBaseComponent } from 'src/app/core/components/form-base.component';
import { requiredIfValidator } from 'src/app/shared/helpers/custom-form-validator.helper';
import { titleCasePipe } from 'src/app/shared/helpers/title-case.helper';
import { contaPt } from '../../i18n/conta-pt';
import { Usuario } from '../../models/usuario.model';

const CONVENIO_PARTICULAR = 1;
const CONVENIO_VAZIO: any = undefined;

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.less'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CadastroComponent extends FormBaseComponent implements OnInit {
  @Input('desabilitar-dados-pessoais') desabilitarDadosPessoais: boolean =
    false;
  @Input('exibir-info-acesso') exibirInfoAcesso: boolean = true;

  @Input() set usuario(value: Usuario) {
    if (value) {
      this.form.patchValue(value);
      this.definirValidacoesDoFormulario();
    }
  }

  form!: UntypedFormGroup;
  literals = contaPt;
  dataAtual = new Date();
  literalsConfirm!: PoDialogConfirmLiterals;
  loading = false;

  readonly listaConvenio: PoComboOption[] = [
    { label: 'Particular', value: 1 },
    { label: 'Brasdesco', value: 2 },
    { label: 'Amil', value: 3 },
  ];

  constructor(objInjector: Injector) {
    super(objInjector);
    this.setupForm();
  }

  ngOnInit(): void {}

  setupForm() {
    this.form = this.fb.group({
      cpf: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(11),
          Validators.maxLength(11),
        ]),
      ],
      nome: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(70),
        ]),
      ],
      nomeMae: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(70),
        ]),
      ],
      dataNascimento: [undefined, Validators.required],
      sexo: ['', Validators.required],
      email: ['', Validators.required],
      celular: ['', Validators.required],
      particular: [undefined],
      codConvenio: [undefined, Validators.required],
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
      termoServico: [false, Validators.requiredTrue],
      politicaPrivacidade: [false, Validators.requiredTrue],
    });
  }

  private definirValidacoesDoFormulario(): void {
    if (this.desabilitarDadosPessoais) {
      this.removerValidacoesAlterarDadosDoPerfil();
    }
  }

  private removerValidacoesAlterarDadosDoPerfil(): void {
    const senha = this.form.get('senha');
    const confirmacaoSenha = this.form.get('confirmacaoSenha');
    const termoServico = this.form.get('termoServico');
    const politicaPrivacidade = this.form.get('politicaPrivacidade');

    senha.clearValidators();
    confirmacaoSenha.clearValidators();
    termoServico.clearValidators();
    politicaPrivacidade.clearValidators();

    senha.updateValueAndValidity();
    confirmacaoSenha.updateValueAndValidity();
    termoServico.updateValueAndValidity();
    politicaPrivacidade.updateValueAndValidity();
  }

  titleCase(control: AbstractControl) {
    if (control?.value) {
      control.setValue(titleCasePipe(control.value));
    }
  }

  definirConvenioParticular(particular: boolean): void {
    if (particular) {
      this.form.patchValue({ codConvenio: CONVENIO_PARTICULAR });
    } else {
      this.form.patchValue({ codConvenio: CONVENIO_VAZIO });
    }
  }

  selecionarConvenio(convenio: number): void {
    if (convenio !== CONVENIO_PARTICULAR) {
      this.form.patchValue({ particular: false });
    } else {
      this.form.patchValue({ particular: true });
    }
  }

  abrirTermo() {
    console.log('abrirTermo numa modal');
  }
}
