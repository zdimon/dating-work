
import {Injectable, Inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Injector } from '@angular/core';
import { APP_CONFIG } from '../settings';

@Injectable()
export class PhotoService {


  constructor(
    private http: HttpClient,
    public injector: Injector,
    @Inject(APP_CONFIG) private app_config,
  ) {
  }

  public sendPhoto(data: any) {
    return this.http.post(`${this.app_config.APIurl}/photos/add/image`, data);
  }

  public sendCrop(data: any) {
    return this.http.post(`${this.app_config.APIurl}/photos/crop`, data);
  }

  public sendModerate(data: any) {
    return this.http.post(`${this.app_config.APIurl}/moderate/photo`, data);
  }
}
