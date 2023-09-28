import { Entity } from "src/app/core/models/entity.base";

export class LoginModel extends Entity{
  cpf: string;
  senha: string;

  constructor(login: Partial<LoginModel>) {
    super();
    Object.assign(this, login);
  }
}
