import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Injector } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import {
  PoDialogConfirmOptions,
  PoDialogService,
  PoFieldModule,
  PoModule,
} from '@po-ui/ng-components';
import { configureTestSuite } from 'ng-bullet';
import { of } from 'rxjs';
import { WindowUtilService } from 'src/app/shared/services/window-util.service';
import * as TypeMoq from 'typemoq';
import { Usuario } from '../models/usuario.model';
import { ContaService } from '../services/conta.service';
import { ContaComponent } from './conta.component';

const contaServiceMock = TypeMoq.Mock.ofType(ContaService).object;
const dialogServiceMock = TypeMoq.Mock.ofType(PoDialogService).object;
const windowUtilServiceMock = TypeMoq.Mock.ofType(WindowUtilService).object;

describe('ContaComponent', () => {
  let component: ContaComponent;
  let fixture: ComponentFixture<ContaComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        PoModule,
        PoFieldModule,
        HttpClientTestingModule,
        RouterTestingModule,
      ],
      declarations: [ContaComponent],
      providers: [
        Injector,
        { provide: ContaService, useValue: contaServiceMock },
        { provide: PoDialogService, useValue: dialogServiceMock },
        { provide: WindowUtilService, useValue: windowUtilServiceMock },
      ],
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('cancelar', () => {
    let formulario: FormGroup;

    beforeEach(() => {
      formulario = new FormGroup({});
    });

    describe('Deve navegar para login', () => {
      beforeEach(() => {
        spyOn(component['router'], 'navigate');
      });

      it('Quando o formulário for pristine', () => {
        formulario.markAsPristine();

        spyOn(dialogServiceMock, 'confirm');
        component.cancelar(formulario);

        expect(component['poAlert'].confirm).not.toHaveBeenCalled();
        expect(component['router'].navigate).toHaveBeenCalledWith(['/login']);
      });

      it('Quando o formulário for dirty e a caixa de diálogo for confirmada', () => {
        formulario.markAsDirty();

        spyOn(dialogServiceMock, 'confirm').and.callFake(
          (confirmOptions: PoDialogConfirmOptions) => {
            confirmOptions.confirm();
          }
        );
        component.cancelar(formulario);

        expect(component['poAlert'].confirm).toHaveBeenCalled();
        expect(component['router'].navigate).toHaveBeenCalledWith(['/login']);
      });
    });

    it('Não deve navegar para login quando a caixa de diálogo não for confirmada', () => {
      formulario.markAsDirty();

      spyOn(dialogServiceMock, 'confirm');
      spyOn(component['router'], 'navigate');
      component.cancelar(formulario);

      expect(component['poAlert'].confirm).toHaveBeenCalled();
      expect(component['router'].navigate).not.toHaveBeenCalled();
    });
  });

  describe('criarUsuario', () => {
    it('Deve criar um usuário com sucesso', () => {
      const usuario = new Usuario({
        cpf: '12345678901',
        nome: 'Teste',
        nomeMae: 'Teste Mãe',
        dataNascimento: new Date(),
        sexo: 'M',
        email: 'teste@teste.com',
        celular: '11999999999',
        codConvenio: 1,
        senha: 'Teste1234',
      });

      spyOn(component['servico'], 'cadastrar').and.returnValue(of(null));
      spyOn(component['router'], 'navigate');
      component.criarUsuario(usuario);

      expect(component['servico'].cadastrar).toHaveBeenCalledWith(usuario);
      expect(component['router'].navigate).toHaveBeenCalledWith(['/login']);
      expect(component.loading).toBe(false);
    });
  });
});
