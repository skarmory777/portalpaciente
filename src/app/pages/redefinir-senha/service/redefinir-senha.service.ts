import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { BaseHttpService } from 'src/app/core/webapi/base.http.service';
import RedefinirSenhaRequest from '../models/redefinir-senha-request.model';

const CONTROLLER_NAME = 'sau-portal/password-reset';

@Injectable({
  providedIn: 'root',
})
export class RedefinirSenhaService {
  constructor(private httpBase: BaseHttpService) {}

  redefinir(recuperarSenhaRequest: RedefinirSenhaRequest): Observable<void> {
    return this.httpBase.post<any>(
      CONTROLLER_NAME,
      undefined,
      recuperarSenhaRequest
    );
  }
}
