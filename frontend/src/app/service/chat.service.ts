
import {Injectable, Inject} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injector } from '@angular/core';
import { APP_CONFIG } from '../settings';

@Injectable()
export class ChatService {

  constructor(
    private http: HttpClient,
    public injector: Injector,
    @Inject(APP_CONFIG) private app_config
  ) {



  }

  public stop(room: any) {
    return this.http.post(`${this.app_config.APIurl}/room/stop`,room)
  }

  public sendMessage(message: any){
    return this.http.post(`${this.app_config.APIurl}/room/message`,message);
  }

  public addRoom(data: any){
    return this.http.post(`${this.app_config.APIurl}/room/add`,data);
  }

  public getSmiles(){
    return this.http.get(`${this.app_config.APIurl}/settings/smiles`);
  }

}
