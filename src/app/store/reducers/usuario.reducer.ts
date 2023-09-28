import { Action, createReducer, on } from '@ngrx/store';
import { Usuario } from 'src/app/pages/conta/models/usuario.model';
import {
  obterUsuario,
  obterUsuarioFalha,
  obterUsuarioSucesso,
} from '../actions';

export interface UsuarioState {
  usuario: Usuario;
  error: any;
}

const initialState: UsuarioState = {
  usuario: undefined,
  error: undefined,
};

const usuarioReducer = createReducer(
  initialState,
  on(obterUsuario, (state) => ({ ...state, error: undefined })),
  on(obterUsuarioSucesso, (state, { payload }) => ({
    ...state,
    usuario: payload,
    error: undefined,
  })),
  on(obterUsuarioFalha, (state, { error }) => ({ ...state, error }))
);

export function reducer(state = initialState, action: Action) {
  return usuarioReducer(state, action);
}
