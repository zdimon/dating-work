import { Photo, PhotoState } from './photos.store';
import {Injectable, Inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Injector } from '@angular/core';
import { APP_CONFIG } from '../../settings';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { muteFirst } from '../mute-first-observable';
import { getPhotoStateSelector } from './photos.selector';
import { switchMap } from 'rxjs/operators';


@Injectable()
export class PhotoService {

  load$: Observable<PhotoState>;


  constructor(
    private http: HttpClient,
    public injector: Injector,
    private store: Store<PhotoState>,
    @Inject(APP_CONFIG) private app_config,
  ) {

    //this.load$ = this.store.pipe<PhotoState>(
   //   select(getPhotoStateSelector),
   //   this.getList(1)
   // );
  }1

  public getList(page:number) {
    page==1 ? page = 0: page = page;
    let offset = page*10;
    return this.http.get(`${this.app_config.APIurl}/photos/list`);
  }

  public save(photo: Photo){
    return this.http.put(`${this.app_config.APIurl}/photos/${photo.id}/`,photo);
  }

  public add(photo: Photo){
    return this.http.post(`${this.app_config.APIurl}/photos`,photo);
  }

  public setMain(photo: Photo){
    return this.http.post(`${this.app_config.APIurl}/photos/setmain`,photo);
  }

  public delete(photo: Photo){
    return this.http.post(`${this.app_config.APIurl}/photos/delete`,photo);
  }

}
