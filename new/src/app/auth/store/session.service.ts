
import {Injectable, Inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Injector } from '@angular/core';
import { APP_CONFIG } from '../../settings';


@Injectable()
export class SessionService {


  constructor(
    private http: HttpClient,
    public injector: Injector,
    @Inject(APP_CONFIG) private app_config,
  ) {
  }


  public updateSocketId(data: any){
    return this.http.post(`${this.app_config.APIurl}/online/update/socket/id`,data);
  }

  public addAccount(data: any){
    return this.http.post(`${this.app_config.APIurl}/account/add`,data);
  }

  public setLanguage(language: string){
    return this.http.get(`${this.app_config.APIurl}/account/setlanguage/${language}`);
  }

}
