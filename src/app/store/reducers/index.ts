import { isDevMode } from '@angular/core';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';

import * as UsuarioReducer from './usuario.reducer';

export interface AppState {
  usuarioReducer: UsuarioReducer.UsuarioState;
}

export const reducers: ActionReducerMap<AppState> = {
  usuarioReducer: UsuarioReducer.reducer,
};

export const metaReducers: MetaReducer<AppState>[] = isDevMode() ? [] : [];
