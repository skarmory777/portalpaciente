import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { PoDialogService, PoModule } from '@po-ui/ng-components';
import { configureTestSuite } from 'ng-bullet';
import { of } from 'rxjs';
import * as TypeMoq from 'typemoq';

import { AuthenticationService } from 'src/app/pages/auth/services/authentication.service';
import { AlterarSenhaModalComponent } from './alterar-senha-modal.component';
import { AlterarSenhaService } from './service/alterar-senha.service';
import { WindowUtilService } from 'src/app/shared/services/window-util.service';
import { NotificationService } from 'src/app/shared/services/notification/notification.service';

const authenticationServiceMock = TypeMoq.Mock.ofType(AuthenticationService).object;
const alterarSenhaServiceMock = TypeMoq.Mock.ofType(AlterarSenhaService).object;
const windowUtilServiceMock = TypeMoq.Mock.ofType(WindowUtilService).object;
let alterararSenhaService: AlterarSenhaService;
let authenticationService: AuthenticationService;
let notificationService: NotificationService;
let dialogService: PoDialogService;

describe('AlterarSenhaModalComponent', () => {
  let component: AlterarSenhaModalComponent;
  let fixture: ComponentFixture<AlterarSenhaModalComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        AlterarSenhaModalComponent
      ],
      imports: [
        PoModule,
        RouterTestingModule,
        ReactiveFormsModule,
      ],
      providers: [
        { provide: AlterarSenhaService, useValue: alterarSenhaServiceMock },
        { provide: AuthenticationService, useValue: authenticationServiceMock },
        { provide: WindowUtilService, useValue: windowUtilServiceMock },
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlterarSenhaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    alterararSenhaService = fixture.debugElement.injector.get(AlterarSenhaService);
    authenticationService = fixture.debugElement.injector.get(AuthenticationService);
    notificationService = fixture.debugElement.injector.get(NotificationService);
    dialogService = fixture.debugElement.injector.get(PoDialogService);
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve abrir o modal', () => {
    spyOn(component.poModal, 'open');

    component.abrir();

    expect(component.poModal.open).toHaveBeenCalled();
  });

  it('deve alterar senha quando usuário informar os dados corretamente', () => {
    spyOn(alterararSenhaService, 'alterar').and.returnValue(of(void 0));
    spyOn(notificationService, 'success');
    spyOn(notificationService, 'error');
    spyOn(dialogService, 'alert').and.callFake((alertOptions) => {
      alertOptions.ok();
    });
    spyOn(authenticationService, 'logout').and.returnValue(of(void 0));

    component.confirmar();

    expect(alterararSenhaService.alterar).toHaveBeenCalled();
    expect(notificationService.success).toHaveBeenCalled();
    expect(notificationService.error).not.toHaveBeenCalled();
    expect(authenticationService.logout).toHaveBeenCalled();
  });
});
