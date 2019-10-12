
import {Injectable, Inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Injector } from '@angular/core';
import { APP_CONFIG } from '../settings';

@Injectable()
export class UserOnlineService {


  constructor(
    private http: HttpClient,
    public injector: Injector,
    @Inject(APP_CONFIG) private app_config,
  ) {
  }

  public getUserOnline() {
    return this.http.get(`${this.app_config.APIurl}/user_online/`);
  }

}
