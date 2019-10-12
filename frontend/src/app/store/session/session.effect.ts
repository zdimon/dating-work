
import { Injectable } from '@angular/core';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { map, switchMap, catchError } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {SessionService} from './session.service';
import * as sessionActions from './session.action';



@Injectable()
export class SessionEffects {
  constructor(
    private actions$: Actions,
    private service: SessionService
  ) {}

  @Effect()
  updateSocketId$ = this.actions$.pipe(
    ofType(sessionActions.ActionTypes.SetSID),
    switchMap((action: any) => {
      return this.service
        .updateSocketId(action.payload).pipe(
          map((room: any) => new sessionActions.SidDone())
        );
    })
  );


  @Effect()
  addAccount$ = this.actions$.pipe(
    ofType(sessionActions.ActionTypes.AddAccount),
    switchMap((action: any) => {
      return this.service
        .addAccount(action.payload).pipe(
          map((user: any) => new sessionActions.AddAccountSuccess(user))
        );
    })
  );



  @Effect()
  setLanguage$ = this.actions$.pipe(
    ofType(sessionActions.ActionTypes.SetLanguage),
    switchMap((action: any) => {
      return this.service
        .setLanguage(action.payload).pipe(
          map((user: any) => new sessionActions.SetLanguageDone())
        );
    })
  );

}


