

import * as galleryActions from './gallery.action'
import { Injectable } from '@angular/core';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { map, switchMap, catchError } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

//import { OnlineService } from './online.service';
import { GalleryService } from './gallery.service';




@Injectable()
export class GalleryEffects {
  constructor(
    private actions$: Actions,
    private service: GalleryService
  ) {}


  @Effect()
  loadgallery$ = this.actions$.pipe(
    ofType(galleryActions.ActionTypes.LoadItems),
    switchMap(() => {
      return this.service
        .getList()
        .pipe(
          map((gallery: any) => new galleryActions.Load(gallery))
        );
    })
  );


}


