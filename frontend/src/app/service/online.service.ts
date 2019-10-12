
import {Injectable, Inject} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injector } from '@angular/core';
import { APP_CONFIG } from '../settings';
import {TokenService} from '../service/token.service';

@Injectable()
export class OnlineService {


  constructor(
    private http: HttpClient,
    public injector: Injector,
    @Inject(APP_CONFIG) private app_config,
    private token_service: TokenService
  ) {


  }


  public set_online(socket_id: string) {
    let data = {
      task: 'set_online',
      token:  this.token_service.getToken(),
      socket_id: socket_id
    }
    return this.http.post(`${this.app_config.APIurl}/celery/task`, data );
  }

  public set_offline() {
    let data = {
      task: 'set_offline',
      token:  this.token_service.getToken(),
      socket_id: this.token_service.getSid()
    }
    return this.http.post(`${this.app_config.APIurl}/celery/task`, data );
  }


}
