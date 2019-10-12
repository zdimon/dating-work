import { Action } from '@ngrx/store';
import { User } from '../users/users.store';
import { OnlineState } from './online.store';



export enum ActionTypes {
  Add = '[Online] Add user online',
  Remove = '[Online] Remove user online',
  LoadItems = '[Online] Load user online from server',
  LoadSuccess = '[Online] Load success',
}

export class Add implements Action {
  readonly type = ActionTypes.Add;

  constructor(public payload: User) {}
}

export class Get implements Action {
  readonly type = ActionTypes.LoadItems;
  
}

export class Remove implements Action {
  readonly type = ActionTypes.Remove;

  constructor(public payload: User) {}
}

export class Load implements Action {
  readonly type = ActionTypes.LoadSuccess;

  constructor(public payload: OnlineState) {}
}





export type ActionsUnion = Add | Get | Load | Remove
