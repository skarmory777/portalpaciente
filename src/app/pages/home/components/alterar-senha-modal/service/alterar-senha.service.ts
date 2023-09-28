import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

import { ContaService } from "src/app/pages/conta/services/conta.service";
import AlterarSenhaRequest from "../models/alterar-senha-request.model";

@Injectable({
  providedIn: 'root',
})
export class AlterarSenhaService {
  constructor(private contaService: ContaService) { }

  alterar(alterarSenhaRequest: AlterarSenhaRequest): Observable<void> {
    return this.contaService.alterarSenha(alterarSenhaRequest);
  }
}