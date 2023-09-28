export enum UsuarioStatus {
  Ativo = 'A',
  Inativo = 'I',
};

export default interface UsuarioAlterarStatusRequest {
  status: UsuarioStatus
}