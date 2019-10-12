import { Action } from '@ngrx/store';
import { User, UserState } from './users.store';



export enum UserActionTypes {
  UpdateUsers = '[User] Update users',
  Remove = '[User] Remove from cart',
  LoadItems = '[User] Load items from server',
  LoadSuccess = '[User] Load success',
}



export class UpdateUsers implements Action {
  readonly type = UserActionTypes.UpdateUsers;
  constructor(public payload: {[id: number]: User}) {}
}

export class GetUsers implements Action {
  readonly type = UserActionTypes.LoadItems;
  constructor(public page: number) {}
}

export class RemoveUser implements Action {
  readonly type = UserActionTypes.Remove;

  constructor(public payload: User) {}
}

export class LoadUsers implements Action {
  readonly type = UserActionTypes.LoadSuccess;

  constructor(public payload: UserState) {}
}





export type UserActionsUnion =  GetUsers | LoadUsers | RemoveUser | UpdateUsers
