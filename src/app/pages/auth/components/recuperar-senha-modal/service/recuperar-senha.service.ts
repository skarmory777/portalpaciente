import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { BaseHttpService } from "src/app/core/webapi/base.http.service";
import RecuperarSenhaRequest from "../models/recuperar-senha-request.model";

const CONTROLLER_NAME = 'sau-portal/password-recovery';

@Injectable({
  providedIn: 'root',
})
export class RecuperarSenhaService {
  constructor(
    private httpBase: BaseHttpService,
  ) {}

  recuperar(recuperarSenhaRequest: RecuperarSenhaRequest): Observable<void> {
    return this.httpBase.post<any>(CONTROLLER_NAME, undefined, recuperarSenhaRequest);
  }

}