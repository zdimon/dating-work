import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable, timer, Subscribable, pipe, Subscription } from 'rxjs';
import {OnlineService} from './online.service';

import { Store } from '@ngrx/store';


/// session store
import * as sessionActions from '../store/session/session.action';
import { SessionState } from '../store/session/session.store';
import { getSessionStateSelector, selectUser } from '../store/session/session.selector';
////

/// User store
import { User, UserState } from '../store/users/users.store';
import { UpdateUsers } from '../store/users/users.action';

///
import {TokenService} from '../service/token.service';
import {ReplaySubject} from 'rxjs';
import { GalleryState } from '../store/gallery/gallery.store';
import * as galleryActions from '../store/gallery/gallery.action';
import { RoomState } from '../chat/store/chat.store';
import * as roomActions from '../chat/store/chat.action';
import { getRooms } from '../chat/store/chat.selector';




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

  current_user: User;


  timer: any;

  constructor(
    private socket: Socket,
    private online_service: OnlineService,
    private session_store: Store<SessionState>,
    private gallery_store: Store<GalleryState>,
    private user_store: Store<UserState>,
    private room_store: Store<RoomState>,
    private token_service: TokenService
    ) {
    this.session_store.select(getSessionStateSelector);

    this.ping$.subscribe( (data) => {
      this.socket.emit('ng-action',{
        'action': 'pong',
        'socket_id': socket.ioSocket.id,
        'token': this.token_service.getToken()
      });
    }
    );

    this.user_online$.subscribe((data) => {

      // update gallery store
      //console.log(data);
      if(data){

        // set user
        //if(this.current_user){
        //  if(this.current_user.id !== data.user[Object.keys(data.user)[0]].id){
          this.user_store.dispatch(new UpdateUsers(data.user));
        //  }
      //}

        //this.gallery_store.dispatch(new galleryActions.UpdateUser(data.user));

        // Update room
        //this.room_store.dispatch(new roomActions.UpdateRoom(data.user));

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
      this.token_service.setSid(socket.ioSocket.id);
      this.session_store.dispatch(new sessionActions.SetSid({
        token: this.token_service.getToken(),
        socket_id: socket.ioSocket.id
      }));

      if(this.token_service.getToken()) {
        this.set_me_online(this.token_service.getToken());
      }
    })



  }

  sendOffer(data: any){
    const payload = {'action': 'MESSAGE:sending-offer', 'data': data};
    this.socket.emit('ng-action',payload);
  }

  set_me_online(username: string) {
    // select session user from the store and send it to server
    //this.session_store.select(selectUser).subscribe(user => {
    //  const payload = {'action': 'MESSAGE:set_me_online', 'data': {'user': user}};
    //  this.socket.emit('ng-action',payload);
    //});

    //this.online_service.set_online(this.socket.ioSocket.id).subscribe(data => {
    //  this.token_service.setSid(this.socket.ioSocket.id);
    //});
    //this.timer = timer(1000,2000).subscribe(val => console.log(username));
  }

  set_m_offnline(username: string) {
    this.token_service.removeToken()
    const payload = {'action': 'MESSAGE:set_me_offline',
    'data': {'username': username, 'token': this.token_service.getToken()}
    };
    this.socket.emit('ng-action',payload);
    //console.log('Setting offline');
    //this.online_service.set_offline().subscribe(data => {
    //
    //});
    //this.timer.unsubscribe();
  }

}
