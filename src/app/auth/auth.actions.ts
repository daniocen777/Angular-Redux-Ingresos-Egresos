import { Action } from "@ngrx/store";
import { User } from "./user.model";

export const SET_USER = "[Auth] SET_USER";
export const UNSET_USER = "[Auth] UNSET_USER";

export class UnsetUserAction implements Action {
  readonly type = UNSET_USER;
  constructor() {}
}

export class SetUserAction implements Action {
  readonly type = SET_USER;
  constructor(public user: User) {}
}

export type acciones = SetUserAction | UnsetUserAction;
