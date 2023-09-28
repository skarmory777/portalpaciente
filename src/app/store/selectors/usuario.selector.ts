import { createSelector } from '@ngrx/store';

import { AppState } from '../reducers';
import { UsuarioState } from '../reducers/usuario.reducer';

export const usuarioSelector = (state: AppState) => {
  return state.usuarioReducer;
};


export const obterUsuario = createSelector(
  usuarioSelector,
  (state: UsuarioState) => {
    return state.usuario;
  }
);
