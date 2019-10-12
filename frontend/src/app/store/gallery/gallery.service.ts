import {Injectable, Inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Injector } from '@angular/core';
import { APP_CONFIG } from '../../settings';
import { Observable } from 'rxjs';
import {  Store } from '@ngrx/store';
import { GalleryState } from './gallery.store';

@Injectable()
export class GalleryService {

  load$: Observable<GalleryState>;


  constructor(
    private http: HttpClient,
    public injector: Injector,
    private store: Store<GalleryState>,
    @Inject(APP_CONFIG) private app_config,
  ) {

  }1

  public getList() {

    return this.http.get(`${this.app_config.APIurl}/gallery/list`);
  }



}
