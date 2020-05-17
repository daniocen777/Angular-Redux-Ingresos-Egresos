import { Action } from "@ngrx/store";

export const ACTIVAR_LOADING = "[UI Loading] ACTIVAR_LOADING";
export const DESACTIVAR_LOADING = "[UI Loading] DESACTIVAR_LOADING";

export class DesactivarLoadingAction implements Action {
  readonly type = DESACTIVAR_LOADING;
  constructor() {}
}

export class ActivarLoadingAction implements Action {
  readonly type = ACTIVAR_LOADING;
  constructor() {}
}

export type acciones = DesactivarLoadingAction | ActivarLoadingAction;
