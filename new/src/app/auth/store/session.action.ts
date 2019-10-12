import { Action } from '@ngrx/store';
import {SessionState} from './session.store';
import {User} from '../../main/apps/users/store/users.store';



export enum ActionTypes {
  Init = '[Session] Init user',
  SetSID = '[Session] Set socket id',
  SidDone = '[Session] SID installed on server',
  SetToken = '[Session] Set token',
  LogIn = '[Session] Log in',
  LogOut = '[Session] Log out',
  AddAccount = '[Session] Add account',
  UpdateUser = '[Session] Update user',
  AddAccountSuccess = '[Session] Add account success',
  SetMainPhoto = '[Session] Set main photo',
  SetLanguage = '[Session] SetLanguage',
  SetLanguageDone = '[Session] SetLanguageDone'
}

export class UpdateUser implements Action {
  readonly type = ActionTypes.UpdateUser;
  constructor(public payload: User) {}
}

export class SetMainPhoto implements Action {
  readonly type = ActionTypes.SetMainPhoto;
  constructor(public payload: string) {}
}

export class Init implements Action {
  readonly type = ActionTypes.Init;
  constructor(public payload: SessionState) {}
}

export class SetSid implements Action {
  readonly type = ActionTypes.SetSID;
  constructor(public payload: any) {}
}

export class SidDone implements Action {
  readonly type = ActionTypes.SidDone;
}

export class SetToken implements Action {
  readonly type = ActionTypes.SetToken;
  constructor(public payload: string) {}
}

export class LogIn implements Action {
  readonly type = ActionTypes.LogIn;
  constructor(public payload: SessionState) {}
}

export class LogOut implements Action {
  readonly type = ActionTypes.LogOut;

}

export class AddAccount implements Action {
  readonly type = ActionTypes.AddAccount;
  constructor(public payload: any) {}
}

export class AddAccountSuccess implements Action {
  readonly type = ActionTypes.AddAccountSuccess;
  constructor(public payload: User) {}
}

export class SetLanguage implements Action {
  readonly type = ActionTypes.SetLanguage;
  constructor(public payload: string) {}
}

export class SetLanguageDone implements Action {
  readonly type = ActionTypes.SetLanguageDone;
}

export type ActionsUnion = Init | SetSid | SetToken | LogOut | LogIn | SidDone | AddAccount | AddAccountSuccess | SetMainPhoto | SetLanguage | SetLanguageDone | UpdateUser
