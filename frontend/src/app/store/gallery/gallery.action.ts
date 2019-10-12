import { Action } from '@ngrx/store';
import { User } from '../users/users.store';
import { GalleryState } from './gallery.store';




export enum ActionTypes {
  LoadItems = '[Gallery] Load user online from server',
  LoadSuccess = '[Gallery] Load success',
  UpdateUser = '[Gallery] Update user',
  Done = '[Gallery] Done',
}


export class Get implements Action {
  readonly type = ActionTypes.LoadItems;
}

export class Load implements Action {
  readonly type = ActionTypes.LoadSuccess;
  constructor(public payload: GalleryState) {}
}

export class UpdateUser implements Action {
  readonly type = ActionTypes.UpdateUser;
  constructor(public payload: User) {}
}


export class Done implements Action {
  readonly type = ActionTypes.Done;
}



export type ActionsUnion =  Get | Load | Done | UpdateUser
