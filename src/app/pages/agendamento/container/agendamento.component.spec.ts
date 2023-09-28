import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { PoDialogService, PoModule, PoStepperStatus } from '@po-ui/ng-components';
import { configureTestSuite } from 'ng-bullet';
import { of } from 'rxjs';
import * as TypeMoq from 'typemoq';

import { WindowUtilService } from 'src/app/shared/services/window-util.service';
import { AgendamentoComponent } from './agendamento.component';

const windowUtilServiceMock = TypeMoq.Mock.ofType(WindowUtilService).object;
let windowUtilService: WindowUtilService;

describe('AgendamentoComponent', () => {
  let component: AgendamentoComponent;
  let fixture: ComponentFixture<AgendamentoComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [AgendamentoComponent],
      imports: [PoModule, RouterTestingModule, ReactiveFormsModule],
      providers: [
        { provide: WindowUtilService, useValue: windowUtilServiceMock },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgendamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    windowUtilService = fixture.debugElement.injector.get(WindowUtilService);
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve retornar para página Home quando estiver na primeira etapa', () => {
    spyOn(windowUtilService, 'voltar');

    component.voltar();

    expect(windowUtilService.voltar).toHaveBeenCalled();
  });


  it('deve retornar para etapa anterior', () => {
    spyOn(windowUtilService, 'voltar');
    spyOn(component.stepper, 'previous');

    component.stepper.next();
    component.voltar();

    expect(component.stepper.previous).toHaveBeenCalled();
    expect(windowUtilService.voltar).not.toHaveBeenCalled();
  });

  it('deve avançar para etapa posterior', () => {
    spyOn(component.stepper, 'next');

    component.proximo();

    expect(component.stepper.next).toHaveBeenCalled();
  });

  it('deve validar se o stepper está na última etapa e retornar false quando não houver etapas', () => {
    delete component.stepper.poSteps;

    const resultado = component.isUltimaEtapa();

    expect(resultado).toBeFalse();
  });

  it('deve validar se o stepper está na última etapa', () => {
    component.stepper.poSteps.last.status = PoStepperStatus.Active;

    const resultado = component.isUltimaEtapa();

    expect(resultado).toBeTrue();
  });

});
