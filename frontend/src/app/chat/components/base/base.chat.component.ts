


import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import {Router} from "@angular/router";



/// Online store
import * as onlineActions from '../../../store/online/online.action';
import { OnlineState } from '../../../store/online/online.store';
import { getUserOnlineExludeList, getUserOnlineList } from '../../../store/online/online.selector';
////////////////

// User store
import { User, UserState } from '../../../store/users/users.store';
import { selectUserOnlineExludeContactList } from '../../../store/users/users.selector';
import { UpdateUsers } from '../../../store/users/users.action';

/// Session Store
import { SessionState } from '../../../store/session/session.store';
import {selectUser} from '../../../store/session/session.selector';
/////////////

// Room store
import {Room, RoomState} from '../../store/chat.store';
import * as roomActions from '../../store/chat.action';
import { getRoomStateSelector, getRoomList } from '../../store/chat.selector';

//////////////

/// Services
import { ChatService } from '../../services/chat.service';


@Component({
  selector: 'app-base-chat',
  templateUrl: './base.chat.component.html',
  styleUrls: ['./base.chat.component.css']
})
export class BaseChatComponent implements OnInit {

  online: Observable<any>;
  current_user: User;
  rooms: Observable<Room[]>;

  constructor(
    private router: Router,
    private user_store: Store<UserState>,
    private session_store: Store<SessionState>,
    private room_store: Store<RoomState>,
    private room_service: ChatService

  ) {

    // Set current user from store
    this.session_store.select(selectUser).subscribe(user => {
      this.current_user = user;
    });

    /// Select online users
    this.online = this.user_store.select(selectUserOnlineExludeContactList);

    // select rooms (contacts from the store)
    this.rooms = this.room_store.select(getRoomList);

  }

   ngOnInit() {
     /*
     this.room_service.getRoomList().subscribe((data: any) => {
       console.log(data);
       this.user_store.dispatch(new UpdateUsers(data.contact_users));

     });
     */
     
     this.room_store.dispatch(new roomActions.GetRoomList());

  }

  /*
    Call user from user online component
  */
  doCall(user: any){
    let data = {
      owner: this.current_user,
      abonent: user
    }
    //this.room_store.dispatch(new roomActions.Add(data));
  }

  selectRoom(room: Room){
    this.room_store.dispatch(new roomActions.SetCurrentRoom(room));
    this.router.navigate(['/dashboard/chat/room', room.id])
  }

}
