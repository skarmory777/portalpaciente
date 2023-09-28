import { TestBed, inject } from '@angular/core/testing';
import { configureTestSuite } from 'ng-bullet';
import * as TypeMoq from 'typemoq';

import { ContaService } from 'src/app/pages/conta/services/conta.service';
import { AlterarSenhaService } from './alterar-senha.service';
import AlterarSenhaRequest from '../models/alterar-senha-request.model';

const contaServiceMock = TypeMoq.Mock.ofType(ContaService).object;
let contaService: ContaService;
let service: AlterarSenhaService;

describe('Service: Conta', () => {
  configureTestSuite(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: ContaService, useValue: contaServiceMock }
      ]
    });
  });

  beforeEach(inject([AlterarSenhaService, ContaService],
    (s: AlterarSenhaService, c: ContaService) => {
      service = s;
      contaService = c;
  }));

  it('deve criar o service', () => {
    expect(service).toBeTruthy();
  });

  it('deve alterar a senha do usuário', () => {
    spyOn(contaService, 'alterarSenha');

    const alterarSenhaRequest: AlterarSenhaRequest = {
      senhaAtual: 'Abc*1234',
      senha: 'Cde*4321',
      confirmacaoSenha: 'Cde*4321',
    }
    service.alterar(alterarSenhaRequest);

    expect(contaService.alterarSenha).toHaveBeenCalled();
  });

});
