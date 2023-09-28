import { inject, TestBed } from '@angular/core/testing';
import { configureTestSuite } from 'ng-bullet';
import * as TypeMoq from 'typemoq';

import { BaseHttpService } from 'src/app/core/webapi/base.http.service';
import { RedefinirSenhaService } from './redefinir-senha.service';
import RedefinirSenhaRequest from '../models/redefinir-senha-request.model';

const baseHttpServiceMock = TypeMoq.Mock.ofType(BaseHttpService).object;
let service: RedefinirSenhaService;
let baseHttpService: BaseHttpService;

describe('Service: RedefinirSenha', () => {
  configureTestSuite(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: BaseHttpService, useValue: baseHttpServiceMock }],
    });
  });

  beforeEach(inject(
    [RedefinirSenhaService, BaseHttpService],
    (s: RedefinirSenhaService, b: BaseHttpService) => {
      service = s;
      baseHttpService = b;
    }
  ));

  it('deve criar o service', () => {
    expect(service).toBeTruthy();
  });

  it('deve redefinir a senha do usuário', () => {
    spyOn(baseHttpService, 'post');

    const recuperarSenhaRequest: RedefinirSenhaRequest = {
      senha: 'Abc*1234',
      confirmacaoSenha: 'Abc*1234',
      token: 'token',
    };

    service.redefinir(recuperarSenhaRequest);

    expect(baseHttpService.post).toHaveBeenCalled();
  });
});
