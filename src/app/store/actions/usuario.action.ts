import { createAction, props } from '@ngrx/store';
import { Usuario } from 'src/app/pages/conta/models/usuario.model';

export const enum usuarioTypeAction {
  OBTER_USUARIO = '[OBTER_USUARIO] OBTER USUARIO',
  OBTER_USUARIO_SUCESSO = '[OBTER_USUARIO_SUCESSO] OBTER USUARIO SUCESSO',
  OBTER_USUARIO_FALHA = '[OBTER_USUARIO_FALHA] OBTER USUARIO FALHA',
}

export const obterUsuario = createAction(usuarioTypeAction.OBTER_USUARIO);

export const obterUsuarioSucesso = createAction(
  usuarioTypeAction.OBTER_USUARIO_SUCESSO,
  props<{ payload: Usuario }>()
);

export const obterUsuarioFalha = createAction(
  usuarioTypeAction.OBTER_USUARIO_FALHA,
  props<{ error: any }>()
);
