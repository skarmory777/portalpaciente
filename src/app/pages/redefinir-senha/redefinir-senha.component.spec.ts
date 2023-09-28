import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { PoDialogService, PoModule } from '@po-ui/ng-components';
import { configureTestSuite } from 'ng-bullet';
import { of } from 'rxjs';
import * as TypeMoq from 'typemoq';

import { WindowUtilService } from 'src/app/shared/services/window-util.service';
import { NotificationService } from 'src/app/shared/services/notification/notification.service';
import { RedefinirSenhaComponent } from './redefinir-senha.component';
import { RedefinirSenhaService } from './service/redefinir-senha.service';

const redefinirSenhaServiceMock = TypeMoq.Mock.ofType(
  RedefinirSenhaService
).object;
const windowUtilServiceMock = TypeMoq.Mock.ofType(WindowUtilService).object;
let redefinirSenhaService: RedefinirSenhaService;
let notificationService: NotificationService;
let dialogService: PoDialogService;

describe('RedefinirSenhaComponent', () => {
  let component: RedefinirSenhaComponent;
  let fixture: ComponentFixture<RedefinirSenhaComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [RedefinirSenhaComponent],
      imports: [PoModule, RouterTestingModule, ReactiveFormsModule],
      providers: [
        { provide: RedefinirSenhaService, useValue: redefinirSenhaServiceMock },
        { provide: WindowUtilService, useValue: windowUtilServiceMock },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RedefinirSenhaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    redefinirSenhaService = fixture.debugElement.injector.get(RedefinirSenhaService);
    notificationService = fixture.debugElement.injector.get(NotificationService);
    dialogService = fixture.debugElement.injector.get(PoDialogService);
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve voltar para login quando fechar o modal', fakeAsync(() => {
    spyOn(component['router'], 'navigate');

    component.ngAfterViewInit();

    tick(1);

    component.poModal.close(true);

    expect(component['router'].navigate).toHaveBeenCalledWith(['login']);
  }));

  it('deve redefinir a senha e voltar para login ao confirmar mensagem', () => {
    spyOn(redefinirSenhaService, 'redefinir').and.returnValue(of(void 0));
    spyOn(notificationService, 'success');
    spyOn(dialogService, 'confirm').and.callFake((confirmOptions) => {
      confirmOptions.confirm();
    });
    spyOn(component['router'], 'navigate');

    component.redefinirSenha();

    expect(redefinirSenhaService.redefinir).toHaveBeenCalled();
    expect(notificationService.success).toHaveBeenCalled();
    expect(dialogService.confirm).toHaveBeenCalled();
    expect(component['router'].navigate).toHaveBeenCalledWith(['login']);
  });

  it('deve redefinir a senha e voltar para login ao fechar mensagem', () => {
    spyOn(redefinirSenhaService, 'redefinir').and.returnValue(of(void 0));
    spyOn(notificationService, 'success');
    spyOn(dialogService, 'confirm').and.callFake((confirmOptions) => {
      confirmOptions.close();
    });
    spyOn(component['router'], 'navigate');

    component.redefinirSenha();

    expect(redefinirSenhaService.redefinir).toHaveBeenCalled();
    expect(notificationService.success).toHaveBeenCalled();
    expect(dialogService.confirm).toHaveBeenCalled();
    expect(component['router'].navigate).toHaveBeenCalledWith(['login']);
  });
});
