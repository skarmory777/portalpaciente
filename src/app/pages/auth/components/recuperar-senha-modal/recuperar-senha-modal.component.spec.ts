import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { PoDialogService, PoModule } from '@po-ui/ng-components';
import { configureTestSuite } from 'ng-bullet';
import { of } from 'rxjs';
import { NotificationService } from 'src/app/shared/services/notification/notification.service';
import { WindowUtilService } from 'src/app/shared/services/window-util.service';
import * as TypeMoq from 'typemoq';

import { RecuperarSenhaModalComponent } from './recuperar-senha-modal.component';
import { RecuperarSenhaService } from './service/recuperar-senha.service';

const recuperarSenhaServiceMock = TypeMoq.Mock.ofType(RecuperarSenhaService).object;
const windowUtilServiceMock = TypeMoq.Mock.ofType(WindowUtilService).object;
let recuperarSenhaService: RecuperarSenhaService;
let notificationService: NotificationService;
let dialogService: PoDialogService;

describe('RecuperarSenhaModalComponent', () => {
  let component: RecuperarSenhaModalComponent;
  let fixture: ComponentFixture<RecuperarSenhaModalComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        RecuperarSenhaModalComponent
      ],
      imports: [
        PoModule,
        RouterTestingModule,
        ReactiveFormsModule,
      ],
      providers: [
        { provide: RecuperarSenhaService, useValue: recuperarSenhaServiceMock },
        { provide: WindowUtilService, useValue: windowUtilServiceMock },
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecuperarSenhaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    recuperarSenhaService = fixture.debugElement.injector.get(RecuperarSenhaService);
    notificationService = fixture.debugElement.injector.get(NotificationService);
    dialogService = fixture.debugElement.injector.get(PoDialogService);
  });

  it('deve criar o componenete', () => {
    expect(component).toBeTruthy();
  });

  it('deve abrir o modal', () => {
    spyOn(component.poModal, 'open');

    component.abrir();

    expect(component.poModal.open).toHaveBeenCalled();
  });

  it('deve limpar o formulario ao fechar o modal', fakeAsync(() => {
    spyOn(component.form, 'reset');

    component.abrir();

    tick(1);

    component.poModal.close(true);

    expect(component.form.reset).toHaveBeenCalled();
  }));

  it('deve enviar email quando usuario informar os dados corretamente', () => {
    spyOn(recuperarSenhaService, 'recuperar').and.returnValue(of(void 0));
    spyOn(notificationService, 'success');
    spyOn(notificationService, 'error');
    spyOn(dialogService, 'alert');

    component.confirmar();

    expect(recuperarSenhaService.recuperar).toHaveBeenCalled();
    expect(notificationService.success).toHaveBeenCalled();
    expect(notificationService.error).not.toHaveBeenCalled();
    expect(dialogService.alert).toHaveBeenCalled();
  });

});
