import { UserActionTypes, LoadUsers } from './users.action';
import { Injectable } from '@angular/core';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { map, switchMap, catchError } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { UserService } from './user.service';
import { Observable } from 'rxjs';


@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private service: UserService
  ) {}

  @Effect()
  loadusers$ = this.actions$.pipe(
    ofType(UserActionTypes.LoadItems),
    switchMap((payload: any) => {
      return this.service
        .getUserList(payload.page)
        .pipe(
          map((users: any) => new LoadUsers(users))
        );
    })
  );

}


@Injectable()
export class UserAddEffects {
  constructor(
    private actions$: Actions,
    private service: UserService
  ) {}



}

