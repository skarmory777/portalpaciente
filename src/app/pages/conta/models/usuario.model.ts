import { Entity } from 'src/app/core/models/entity.base';

export class Usuario extends Entity {
  codCadastro: number;
  codPaciente: number;
  cpf: string;
  senha: string;
  nome: string;
  codConvenio: number;
  nomeMae: string;
  dataNascimento: Date;
  sexo: string;
  celular: string;
  email: string;

  constructor(usuario: Partial<Usuario>) {
    super();
    Object.assign(this, usuario);
  }
}
