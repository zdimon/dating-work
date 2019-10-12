
import { Component, OnInit, Input, Output, EventEmitter, OnDestroy,ViewChild, ElementRef } from '@angular/core';
import { Room, RoomState } from '../../store/chat.store';
import { Store } from '@ngrx/store';
import { selectCurrentRoom } from '../../store/chat.selector';
import { Observable, Subscription } from 'rxjs';
import { SessionState } from '../../../store/session/session.store';
import { selectUser } from '../../../store/session/session.selector';
import { User } from '../../../store/users/users.store';
import { ChatService } from '../../../service/chat.service';
import * as roomActions from '../../store/chat.action';
import {Router, ActivatedRoute, Params} from "@angular/router";
import { SocketService } from '../../../service/socket.service';

@Component({
  selector: 'app-room-chat',
  templateUrl: './room.chat.component.html',
  styleUrls: ['./room.chat.component.css']
})
export class RoomChatComponent implements OnInit, OnDestroy {

  room: Room;
  current_user: User;
  $_current_user: Subscription;
  $_new_message: Subscription;
  $_current_room: Subscription;
  $_update_room: Subscription;
  room_id: number;
  message: string ='' ;
  smiles: any;
  @ViewChild('messagescontent',{'static': false}) messagescontent: ElementRef;

  @ViewChild('chattextarea',{'static': false}) chattextarea: ElementRef;


  constructor(
    private room_store: Store<RoomState>,
    private session_state: Store<SessionState>,
    private chat_service: ChatService,
    private router: Router,
    private route: ActivatedRoute,
    private socket_service: SocketService,
  ) {}

   ngOnInit() {

    this.$_current_room = this.room_store.select(selectCurrentRoom).subscribe(data =>{
      this.room = data;
      setTimeout(this.scrollToBottom,500);
    });

    this.$_update_room = this.socket_service.update_room$.subscribe(data => {
      console.log(data.data.data);
      this.room_store.dispatch(new roomActions.UpdateRoom(data.data.data));
    })

    this.chat_service.getSmiles().subscribe(data => {
      this.smiles = data;
    });

    this.$_current_user = this.session_state.select(selectUser).subscribe(data => {
      this.current_user = data;
    });

    this.$_new_message = this.socket_service.chat_message$.subscribe(data => {
      //this.online_store.dispatch(new onlineActions.Get());
      //this.room_store.dispatch(new roomActions.GetRoomList());
      //this.room_store.dispatch(new roomActions.UpdateRoomMessages(data));
      //console.log(data.data.data);
      this.room_store.dispatch(new roomActions.UpdateRoom(data.data.data));
      setTimeout(this.scrollToBottom,500);
    })

    //this.room_id = parseInt(this.route.snapshot.paramMap.get('id'));

    //console.log(this.room_id);
  }

  send(){
    let msg = {
      author: this.current_user,
      message: this.message,
      created: new Date(),
      room_id: this.room.id
    }

    //
    this.chat_service.sendMessage(msg).subscribe(data => {
      //this.room_store.dispatch(new roomActions.SendMessage(data));
      //this.room_store.dispatch(new roomActions.UpdateRoomMessages(data));
      //this.room_store.dispatch(new roomActions.UpdateRoom(data));
    });
    this.message = '';
    setTimeout(this.scrollToBottom,500);
  }



  stopChat(){
    this.chat_service.stop(this.room).subscribe(data => {

    });
  }


  scrollToBottom = () => {
    try {
      this.messagescontent.nativeElement.scrollTop =
      this.messagescontent.nativeElement.scrollHeight + 300;
    } catch (err) {}
  }

  addSmile(smile: any){
    //console.log(smile);
    //console.log(this.chattextarea.nativeElement.value);
    this.message = this.message +' '+ smile.alias+' ';
  }


  ngOnDestroy(){
    this.$_current_user.unsubscribe();
    this.$_new_message.unsubscribe();
    this.$_current_room.unsubscribe();
  }
}
