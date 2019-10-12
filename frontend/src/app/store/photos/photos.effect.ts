import { PhotoService } from './photos.service';
//import { UserActionTypes, LoadUsers } from './users.action';
import * as photoActions from './photos.action'
import { Injectable } from '@angular/core';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { map, switchMap, catchError } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Get } from './photos.action';



@Injectable()
export class PhotoEffects {
  constructor(
    private actions$: Actions,
    private service: PhotoService
  ) {}

  @Effect()
  loadphotos$ = this.actions$.pipe(
    ofType(photoActions.ActionTypes.LoadItems),
    switchMap((payload: any) => {
      return this.service
        .getList(payload.page)
        .pipe(
          map((photos: any) => new photoActions.Load(photos))
        );
    })
  );

  @Effect()
  setmain$ = this.actions$.pipe(
    ofType(photoActions.ActionTypes.SetMain),
    switchMap((payload: any) => {
      return this.service
        .setMain(payload)
        .pipe(
          map((photos: any) => new photoActions.Load(photos))
        );
    })
  );

  @Effect()
  delete$ = this.actions$.pipe(
    ofType(photoActions.ActionTypes.Delete),
    switchMap((payload: any) => {
      return this.service
        .delete(payload)
        .pipe(
          map(() => new photoActions.DeleteSuccess())
        );
    })
  );


}


