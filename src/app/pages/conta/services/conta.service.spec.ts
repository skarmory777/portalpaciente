import { TestBed, inject } from '@angular/core/testing';
import { configureTestSuite } from 'ng-bullet';
import { of } from 'rxjs/internal/observable/of';
import { Observable } from 'rxjs/internal/Observable';
import * as TypeMoq from 'typemoq';

import { BaseHttpService } from 'src/app/core/webapi/base.http.service';
import { Usuario } from '../models/usuario.model';
import { ContaService } from './conta.service';
import AlterarSenhaRequest from '../../home/components/alterar-senha-modal/models/alterar-senha-request.model';

const baseHttpServiceMock = TypeMoq.Mock.ofType(BaseHttpService).object;
let baseHttpService: BaseHttpService;
let service: ContaService;
const usuarioMock: Usuario = {
  nome: 'John Doe',
  codCadastro: undefined,
  codPaciente: undefined,
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

describe('Service: Conta', () => {
  configureTestSuite(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: BaseHttpService, useValue: baseHttpServiceMock }
      ]
    });
  });

  beforeEach(inject([ContaService, BaseHttpService],
    (s: ContaService, b: BaseHttpService) => {
      service = s;
      baseHttpService = b;
  }));

  it('deve criar o service', () => {
    expect(service).toBeTruthy();
  });

  it('deve cadastrar conta', () => {
    let usuarioEsperado: Usuario;

    const usuario: Observable<Usuario> = of({ ...usuarioMock, codCadastro: 123, codPaciente: 123 });
    spyOn(baseHttpService, 'post').and.returnValue(usuario);
    usuario.subscribe((data) => usuarioEsperado = data);

    let usuarioCadastrado: Usuario;
    service.cadastrar(usuarioMock).subscribe((data) => usuarioCadastrado = data);

    expect(baseHttpService.post).toHaveBeenCalled();
    expect(usuarioCadastrado).toEqual(usuarioEsperado);
  });

  it('deve buscar dados da conta', () => {
    let usuarioEsperado: Usuario;

    const usuario: Observable<Usuario> = of({ ...usuarioMock, codCadastro: 123, codPaciente: 123 });
    spyOn(baseHttpService, 'get').and.returnValue(usuario);
    usuario.subscribe((data) => usuarioEsperado = data);

    let usuarioCadastrado: Usuario;
    service.obter().subscribe((data) => usuarioCadastrado = data);

    expect(baseHttpService.get).toHaveBeenCalled();
    expect(usuarioCadastrado).toEqual(usuarioEsperado);
  });

  it('deve atualizar dados da conta', () => {
    spyOn(baseHttpService, 'put').and.returnValue(of(void 0));

    service.alterar(usuarioMock);

    expect(baseHttpService.put).toHaveBeenCalled();
  });

  it('deve atualizar o status do perfil', () => {
    spyOn(baseHttpService, 'patch').and.returnValue(of(void 0));

    service.desativar();

    expect(baseHttpService.patch).toHaveBeenCalled();
  });

  it('deve alterar a senha do usuário', () => {
    spyOn(baseHttpService, 'patch');

    const alterarSenhaRequest: AlterarSenhaRequest = {
      senhaAtual: 'Abc*1234',
      senha: 'Cde*4321',
      confirmacaoSenha: 'Cde*4321',
    };

    service.alterarSenha(alterarSenhaRequest);

    expect(baseHttpService.patch).toHaveBeenCalled();
  });
});
