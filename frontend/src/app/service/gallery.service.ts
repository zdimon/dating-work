
import {Injectable, Inject} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injector } from '@angular/core';
import { APP_CONFIG } from '../settings';
import {TokenService} from '../service/token.service';

@Injectable()
export class GalleryComponentService {


  constructor(
    private http: HttpClient,
    public injector: Injector,
    @Inject(APP_CONFIG) private app_config,
    private token_service: TokenService
  ) {


  }


  public get_list(id: string) {

    return this.http.get(`${this.app_config.APIurl}/gallery/lis` );
  }

  public get_detail(id: string) {

    return this.http.get(`${this.app_config.APIurl}/gallery/detail/${id}` );
  }




}
