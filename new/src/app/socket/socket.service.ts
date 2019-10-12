import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable, timer, Subscribable, pipe, Subscription } from 'rxjs';
//import {OnlineService} from './online.service';

import { Store } from '@ngrx/store';


/// session store
//import * as sessionActions from '../store/session/session.action';
//import { SessionState } from '../store/session/session.store';
//import { getSessionStateSelector, selectUser } from '../store/session/session.selector';
////

/// User store
import { UserState, User } from '../main/apps/users/store/users.store';
import { UpdateUsers } from '../main/apps/users/store/users.action';

///
import {SessionService} from '../auth/session.service';
import {ReplaySubject} from 'rxjs';
//import { GalleryState } from '../store/gallery/gallery.store';
//import * as galleryActions from '../store/gallery/gallery.action';
//import { RoomState } from '../chat/store/chat.store';
//import * as roomActions from '../chat/store/chat.action';
//import { getRooms } from '../chat/store/chat.selector';






@Injectable({
  providedIn: 'root'
})
export class SocketService {
  user_online$: Observable<any> = this.socket.fromEvent<string>('server-action:update_user_online');
  chat_message$: Observable<any> = this.socket.fromEvent<string>('server-action:chat_message');
  ping$: Observable<any> = this.socket.fromEvent<string>('server-action:ping');
  get_offer$: Observable<any> = this.socket.fromEvent<string>('server-action:put_offer');
  get_answer$: Observable<any> = this.socket.fromEvent<string>('server-action:put_answer');
  get_ice$: Observable<any> = this.socket.fromEvent<string>('server-action:put_ice');
  update_session$: Observable<any> = this.socket.fromEvent<string>('server-action:update_session');
  show_billing_dialog$: Observable<any> = this.socket.fromEvent<string>('server-action:show_billing_dialog');
  update_room$: Observable<any> = this.socket.fromEvent<string>('server-action:update_current_room');

  ///// Moderation

  photo_moderation$: Observable<any> = this.socket.fromEvent<string>('server-action:moderate:photo');


  _offer_emmiter$ = new ReplaySubject();
  _answer_emmiter$ = new ReplaySubject();
  _ice_emmiter$ = new ReplaySubject();

  //current_user: User;


  timer: any;

  constructor(
    private socket: Socket,
    //private online_service: OnlineService,
    //private session_store: Store<SessionState>,
    //private gallery_store: Store<GalleryState>,
    private user_store: Store<UserState>,
    //private room_store: Store<RoomState>,
    private session_service: SessionService
    ) {
    //  console.log('socket constructor');
    //this.session_store.select(getSessionStateSelector);

    this.ping$.subscribe( (data) => {
      this.socket.emit('ng-action',{
        'action': 'pong',
        'socket_id': socket.ioSocket.id,
        'token': this.session_service.getToken()
      });
    }
    );

    this.user_online$.subscribe((data) => {

      // update gallery store
      if(data){
        // set user
        this.user_store.dispatch(new UpdateUsers(data.user));
      }
    })

    this.get_offer$.subscribe((data: any) => {
      this._offer_emmiter$.next(data);
    })

    this.get_answer$.subscribe((data: any) => {
      this._answer_emmiter$.next(data);
    })

    this.get_ice$.subscribe((data: any) => {
      this._ice_emmiter$.next(data);
    })

    this.socket.on('connect', () => {
      this.session_service.setSid(socket.ioSocket.id);
      console.log('connnection');
      //this.session_store.dispatch(new sessionActions.SetSid({
      //  token: this.token_service.getToken(),
      //  socket_id: socket.ioSocket.id
      //}));

      if(this.session_service.getToken()) {
        //this.set_me_online(this.token_service.getToken());
      }
    })



  }

  sendOffer(data: any){
    const payload = {'action': 'MESSAGE:sending-offer', 'data': data};
    this.socket.emit('ng-action',payload);
  }

  reconnect(){
      this.socket.disconnect();
      this.socket.connect();
  }

  /*
  set_m_offnline(username: string) {
    this.session_service.removeToken()
    const payload = {'action': 'MESSAGE:set_me_offline',
    'data': {'username': username, 'token': this.session_service.getToken()}
    };
    this.socket.emit('ng-action',payload);
    
  }
  */

}
