import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeuPerfilComponent } from './meu-perfil.component';
import { Store } from '@ngrx/store';
import { PoDialogService, PoModule } from '@po-ui/ng-components';
import { RouterTestingModule } from '@angular/router/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { configureTestSuite } from 'ng-bullet';
import { of } from 'rxjs/internal/observable/of';
import * as TypeMoq from 'typemoq';

import { ContaService } from '../services/conta.service';
import { WindowUtilService } from 'src/app/shared/services/window-util.service';
import { Usuario } from '../models/usuario.model';
import { NotificationService } from 'src/app/shared/services/notification/notification.service';
import { CadastroComponent } from '../components/cadastro/cadastro.component';
import { AuthenticationService } from '../../auth/services/authentication.service';

const contaServiceMock = TypeMoq.Mock.ofType(ContaService).object;
const windowUtilServiceMock = TypeMoq.Mock.ofType(WindowUtilService).object;
const authenticationServiceMock = TypeMoq.Mock.ofType(
  AuthenticationService
).object;
const usuarioMock: Partial<Usuario> = {
  nome: 'John Doe',
  cpf: '37211974028',
  codConvenio: 1,
  nomeMae: 'Maria Doe',
  dataNascimento: new Date('2023-04-18'),
  sexo: 'M',
  celular: '47999999999',
  email: 'johndoe@gmail.com',
  senha: 'xxx',
  codColigada: 1,
};
const storeMock = {
  pipe() {
    return of(usuarioMock);
  },
};
let windowUtilService: WindowUtilService;
let dialogService: PoDialogService;
let contaService: ContaService;
let notificationService: NotificationService;
let authenticationService: AuthenticationService;
let form: any;
const formularioSpy = jasmine.createSpyObj('CadastroComponent', [
  'markAsPristine',
]);

describe('MeuPerfilComponent', () => {
  let component: MeuPerfilComponent;
  let fixture: ComponentFixture<MeuPerfilComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [MeuPerfilComponent, CadastroComponent],
      imports: [ReactiveFormsModule, PoModule, RouterTestingModule],
      providers: [
        { provide: ContaService, useValue: contaServiceMock },
        { provide: Store, useValue: storeMock },
        { provide: WindowUtilService, useValue: windowUtilServiceMock },
        { provide: AuthenticationService, useValue: authenticationServiceMock },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MeuPerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    windowUtilService = fixture.debugElement.injector.get(WindowUtilService);
    dialogService = fixture.debugElement.injector.get(PoDialogService);
    contaService = fixture.debugElement.injector.get(ContaService);
    notificationService =
      fixture.debugElement.injector.get(NotificationService);
    authenticationService = fixture.debugElement.injector.get(
      AuthenticationService
    );
    form = new FormBuilder().group(usuarioMock);
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
    expect(component.usuario).toEqual(new Usuario(usuarioMock));
  });

  it('deve voltar sem solicitar confirmação do usuário', () => {
    spyOn(windowUtilService, 'voltar');
    spyOn(dialogService, 'confirm');

    component.cancelar(form);

    expect(windowUtilService.voltar).toHaveBeenCalled();
    expect(dialogService.confirm).not.toHaveBeenCalled();
  });

  it('deve solicitar confirmação quando formulário alterado', () => {
    form.markAsDirty();

    spyOn(windowUtilService, 'voltar');
    spyOn(dialogService, 'confirm').and.callFake((confirmOptions) => {
      confirmOptions.confirm();
    });

    component.cancelar(form);

    expect(dialogService.confirm).toHaveBeenCalled();
    expect(windowUtilService.voltar).toHaveBeenCalled();
  });

  it('não deve salvar alteração de dados', () => {
    spyOn(dialogService, 'confirm');
    spyOn(contaService, 'alterar');

    component.alterarDados(form);

    expect(dialogService.confirm).not.toHaveBeenCalled();
    expect(contaService.alterar).not.toHaveBeenCalled();
  });

  it('deve salvar alteração de dados', () => {
    form.markAsDirty();

    spyOn(dialogService, 'confirm').and.callFake((confirmOptions) => {
      confirmOptions.confirm();
    });
    spyOn(contaService, 'alterar').and.returnValue(of(void 0));
    spyOn(notificationService, 'success');

    component.formularioCadastro.form = formularioSpy;

    component.alterarDados(form);

    expect(dialogService.confirm).toHaveBeenCalled();
    expect(contaService.alterar).toHaveBeenCalled();
    expect(notificationService.success).toHaveBeenCalled();
  });

  it('deve abrir modal para confirmar a desativação do perfil', () => {
    const modalDesativarPerfilSpy = jasmine.createSpyObj(
      'DesativarPerfilModalComponent',
      ['abrir']
    );
    component.desativarPerfilModal = modalDesativarPerfilSpy;

    component.confirmarDesativarPerfil();

    expect(component.desativarPerfilModal.abrir).toHaveBeenCalled();
  });

  it('não deve desativar o perfil quando usuário inválido', () => {
    spyOn(contaService, 'desativar');

    component.desativarPerfil(false);

    expect(contaService.desativar).not.toHaveBeenCalled();
  });

  it('deve desativar o perfil quando usuário válido', () => {
    spyOn(contaService, 'desativar').and.returnValue(of(void 0));
    spyOn(notificationService, 'success');
    spyOn(authenticationService, 'logout').and.returnValue(of(void 0));

    component.desativarPerfil(true);

    expect(contaService.desativar).toHaveBeenCalled();
    expect(notificationService.success).toHaveBeenCalled();
    expect(authenticationService.logout).toHaveBeenCalled();
  });
});
