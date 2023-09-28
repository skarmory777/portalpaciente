import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { BaseHttpService } from 'src/app/core/webapi/base.http.service';
import AlterarSenhaRequest from '../../home/components/alterar-senha-modal/models/alterar-senha-request.model';
import UsuarioAlterarStatusRequest, { UsuarioStatus } from '../models/usuario-status-request.model';
import { Usuario } from '../models/usuario.model';

const CONTROLLER_NAME = 'sau-portal';
@Injectable({
  providedIn: 'root',
})
export class ContaService {
  constructor(private httpBase: BaseHttpService) {}

  cadastrar(usuario: Usuario): Observable<Usuario> {
    return this.httpBase.post<Usuario>(`${CONTROLLER_NAME}/signup`, undefined, usuario);
  }

  obter(): Observable<Usuario> {
    return this.httpBase.get<Usuario>(`${CONTROLLER_NAME}/myaccount`);
  }

  alterar(usuario: Usuario): Observable<void> {
    return this.httpBase.put(`${CONTROLLER_NAME}/myaccount/update`, undefined, usuario);
  }

  desativar(): Observable<void> {
    const payload: UsuarioAlterarStatusRequest = {
      status: UsuarioStatus.Inativo
    };
    return this.httpBase.patch(`${CONTROLLER_NAME}/myaccount/status`, undefined, payload);
  }

  alterarSenha(alterarSenhaRequest: AlterarSenhaRequest): Observable<void> {
    return this.httpBase.patch(`${CONTROLLER_NAME}/myaccount/password`, undefined, alterarSenhaRequest);
  }
}
