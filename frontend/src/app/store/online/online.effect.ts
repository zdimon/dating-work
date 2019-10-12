

import * as onlineActions from './online.action'
import { Injectable } from '@angular/core';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { map, switchMap, catchError } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Get } from './online.action';
import { OnlineService } from './online.service';




@Injectable()
export class OnlineEffects {
  constructor(
    private actions$: Actions,
    private service: OnlineService
  ) {}

  @Effect()
  loadphotos$ = this.actions$.pipe(
    ofType(onlineActions.ActionTypes.LoadItems),
    switchMap(() => {
      return this.service
        .getList()
        .pipe(
          map((online: any) => new onlineActions.Load(online))
        );
    })
  );

}


