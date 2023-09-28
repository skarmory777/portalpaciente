import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { PoModule } from '@po-ui/ng-components';
import { configureTestSuite } from 'ng-bullet';

import ItensChecklit, { SenhaChecklistComponent } from './senha-checklist.component';

let itensChecklist: Array<Partial<ItensChecklit>>;

describe('SenhaChecklistComponent', () => {
  let component: SenhaChecklistComponent;
  let fixture: ComponentFixture<SenhaChecklistComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        SenhaChecklistComponent,
      ],
      imports: [
        PoModule,
        RouterTestingModule
      ],
      providers: [ ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SenhaChecklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    itensChecklist = [
      { regex: '.{8,}' },
      { regex: '(?=.*[A-Z])' },
      { regex: '(?=.*[a-z])' },
      { regex: '(?=.*[0-9])' },
    ];
    component.form = new FormBuilder().group({
      senhaAtual: '',
      senha: '',
      confirmacaoSenha: ''
    })
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve verificar senha valida', () => {
    component.form.patchValue({ senha: 'Abc@5678' });

    itensChecklist.forEach(item => {
      const isInvalido = component.isItemInvalido(item.regex);

      expect(isInvalido).toEqual(false);
    });
  });

  it('deve verificar senha invalida', () => {
    component.form.patchValue({ senha: '*/@' });

    itensChecklist.forEach(item => {
      const isInvalido = component.isItemInvalido(item.regex);

      expect(isInvalido).toEqual(true);
    });

  });
});
