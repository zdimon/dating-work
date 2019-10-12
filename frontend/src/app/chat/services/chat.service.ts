
import {Injectable, Inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Injector } from '@angular/core';
import { APP_CONFIG } from '../../settings';
import {RoomState, Room} from '../store/chat.store';

@Injectable()
export class ChatService {


  constructor(
    private http: HttpClient,
    public injector: Injector,
    @Inject(APP_CONFIG) private app_config,
  ) {
  }


  public addRoom(data: any){
    return this.http.post(`${this.app_config.APIurl}/room/add`,data);
  }

  public selectRoom(data: any){
    return this.http.get(`${this.app_config.APIurl}/room/select/${data.id}`);
  }


  public sendMessage(message: any){
    return this.http.post(`${this.app_config.APIurl}/room/message`,message);
  }

  public getRoomList(){
    return this.http.get(`${this.app_config.APIurl}/room/list`);
  }

}
