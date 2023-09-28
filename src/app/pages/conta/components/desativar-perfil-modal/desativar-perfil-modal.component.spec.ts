import { ComponentFixture, TestBed } from '@angular/core/testing';
import * as TypeMoq from 'typemoq';
import { PoModule } from '@po-ui/ng-components';
import { configureTestSuite } from 'ng-bullet';

import { AuthenticationService } from 'src/app/pages/auth/services/authentication.service';

import { DesativarPerfilModalComponent } from './desativar-perfil-modal.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Usuario } from '../../models/usuario.model';
import { of, throwError } from 'rxjs';
import { NotificationService } from 'src/app/shared/services/notification/notification.service';

const authenticationServiceMock = TypeMoq.Mock.ofType(AuthenticationService).object;
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
  codColigada: 1
};
let authenticationService: AuthenticationService;
let notificationService: NotificationService;

describe('AlterarDadosModalComponent', () => {
  let component: DesativarPerfilModalComponent;
  let fixture: ComponentFixture<DesativarPerfilModalComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        DesativarPerfilModalComponent
      ],
      imports: [
        PoModule,
        RouterTestingModule,
      ],
      providers: [
        { provide: AuthenticationService, useValue: authenticationServiceMock },
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DesativarPerfilModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.usuario = new Usuario(usuarioMock);
    authenticationService = fixture.debugElement.injector.get(AuthenticationService);
    notificationService = fixture.debugElement.injector.get(NotificationService)
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve abrir o modal', () => {
    spyOn(component.poModal, 'open');

    component.abrir();

    expect(component.poModal.open).toHaveBeenCalled();
  });

  it('deve fechar o modal', () => {
    spyOn(component.poModal, 'close');

    component.cancelar();

    expect(component.poModal.close).toHaveBeenCalled();
  });

  it('deve confirmar a desativação do perfil quando usuário válido', () => {
    spyOn(authenticationService, 'validar').and.returnValue(of(true));
    spyOn(notificationService, 'error');
    spyOn(component.permiteDesativerPerfil, 'emit');
    spyOn(component.poModal, 'close');

    component.confirmar();

    expect(authenticationService.validar).toHaveBeenCalled();
    expect(notificationService.error).not.toHaveBeenCalled();
    expect(component.permiteDesativerPerfil.emit).toHaveBeenCalled();
    expect(component.poModal.close).toHaveBeenCalled();
  });

  it('não deve confirmar a desativação do perfil quando usuário inválido', () => {
    spyOn(authenticationService, 'validar').and.returnValue(of(false));
    spyOn(notificationService, 'error');
    spyOn(component.permiteDesativerPerfil, 'emit');
    spyOn(component.poModal, 'close');

    component.confirmar();

    expect(authenticationService.validar).toHaveBeenCalled();
    expect(notificationService.error).toHaveBeenCalled();
    expect(component.permiteDesativerPerfil.emit).not.toHaveBeenCalled();
    expect(component.poModal.close).not.toHaveBeenCalled();
  });

});
