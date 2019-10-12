import { Photo, PhotoState } from './photos.store';
import { Action } from '@ngrx/store';




export enum ActionTypes {
  Add = '[Photo] Add photo',
  Remove = '[Photo] Remove photo',
  LoadItems = '[Photo] Load photos from server',
  LoadSuccess = '[Photo] Load success',
  SetMain = '[Photo] Set main',
  Delete = '[Photo] Delete',
  DeleteSuccess = '[Photo] Delete success',
  UpdatePhoto = '[Photo] Update photo',
}


export class UpdatePhoto implements Action {
  readonly type = ActionTypes.UpdatePhoto;
  constructor(public payload: Photo) {}
}

export class Delete implements Action {
  readonly type = ActionTypes.Delete;
  constructor(public payload: Photo) {}
}

export class DeleteSuccess implements Action {
  readonly type = ActionTypes.DeleteSuccess;
}


export class Add implements Action {
  readonly type = ActionTypes.Add;

  constructor(public payload: Photo) {}
}

export class Get implements Action {
  readonly type = ActionTypes.LoadItems;
  constructor(public payload: any) {

  }
}

export class Remove implements Action {
  readonly type = ActionTypes.Remove;

  constructor(public payload: Photo) {}
}

export class Load implements Action {
  readonly type = ActionTypes.LoadSuccess;

  constructor(public payload: PhotoState) {}
}

export class SetMain implements Action {
  readonly type = ActionTypes.SetMain;

  constructor(public payload: Photo) {}
}




export type ActionsUnion = Add | Get | Load | Remove | SetMain | Delete | DeleteSuccess | UpdatePhoto
