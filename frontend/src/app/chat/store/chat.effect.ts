import { ChatService } from '../services/chat.service';
import * as roomActions from '../store/chat.action'
import { Injectable } from '@angular/core';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { map, switchMap, catchError, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { RoomState } from '../store/chat.store';
import { GetRoomList } from '../store/chat.action';

import { UpdateUsers } from '../../store/users/users.action';
import { UserState } from '../../store/users/users.store';



@Injectable()
export class RoomEffects {
  constructor(
    private actions$: Actions,
    private service: ChatService,
    private store: Store<RoomState>,
    private user_store: Store<UserState>
  ) {}

  /*
  @Effect()
  addRoom$ = this.actions$.pipe(
    ofType(roomActions.ActionTypes.Add),
    switchMap((action: any) => {
      return this.service
        .addRoom(action.payload).pipe(
          map((room: any) => new roomActions.SetCurrentRoom(room)),
          tap(() => this.store.dispatch(new GetRoomList()))
        );
    })
  );
  */

  @Effect()
  selectRoom$ = this.actions$.pipe(
    ofType(roomActions.ActionTypes.SetCurrentRoom),
    switchMap((action: any) => {
      return this.service
        .selectRoom(action.payload).pipe(
          map((payload: any) => new roomActions.GetRoomListLoaded(payload))
        );
    })
  );


  /*
  @Effect()
  sendMessage$ = this.actions$.pipe(
    ofType(roomActions.ActionTypes.SendMessage),
    switchMap((action: any) => {
      return this.service.sendMessage(action.payload).pipe(
        map(() => new roomActions.MessageSent())
      );
    })
  );
  */

  @Effect()
  roomList$ = this.actions$.pipe(
    ofType(roomActions.ActionTypes.GetRoomList),
    switchMap((action: any) => {
      return this.service.getRoomList().pipe(
        tap((payload: any) => this.user_store.dispatch(new UpdateUsers(payload.contact_users))),
        map((payload: any) => new roomActions.GetRoomListLoaded(payload))
      );
    })
  );

}


