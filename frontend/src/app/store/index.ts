import { ActionReducerMap } from '@ngrx/store';
import { UserReducer } from './users/users.reducer';
import { UserState } from './users/users.store';
import { Action } from '@ngrx/store';
import { PhotoState } from './photos/photos.store';
import { PhotoReducer } from './photos/photos.reducer';

import { OnlineState } from './online/online.store';
import { OnlineReducer } from './online/online.reducer';

import {RoomState} from '../chat/store/chat.store';
import {RoomReducer} from '../chat/store/chat.reducer';

import {SessionState} from './session/session.store';
import { SessionReduser } from './session/session.reducer';

import { GalleryState } from './gallery/gallery.store';
import { GalleryReducer } from './gallery/gallery.reducer';

export interface AppState {
  users: UserState,
  photos: PhotoState,
  online: OnlineState,
  rooms: RoomState,
  session: SessionState,
  gallery: GalleryState
}
export const AppReducers: ActionReducerMap<AppState, Action> = {
  users: UserReducer,
  photos: PhotoReducer,
  online: OnlineReducer,
  rooms: RoomReducer,
  session: SessionReduser,
  gallery: GalleryReducer
};
