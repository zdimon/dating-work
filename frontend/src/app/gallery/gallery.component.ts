import { SocketService } from './../service/socket.service';

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import {Router} from "@angular/router";

//import { GalleryState } from '../store/gallery/gallery.store';
//import { getUserGalleryList } from '../store/gallery/gallery.selector';
//import * as galleryAction from '../store/gallery/gallery.action';

import { User, UserState } from '../store/users/users.store';
import { selectUserList, selectGalleryUserList } from '../store/users/users.selector';
import { GalleryService } from '../store/gallery/gallery.service';
import { UpdateUsers } from '../store/users/users.action';
import {ChatService} from '../service/chat.service';
import {Subscription} from 'rxjs';
/// Session Store
import { SessionState } from '../store/session/session.store';
import {selectUser} from '../store/session/session.selector';
/////////////

@Component({
  selector: 'app-user-gallery',
  templateUrl: '../templates/gallery/gallery.component.html',
  styleUrls: ['../templates/gallery/gallery.component.css'],
  providers: []
})
export class GalleryComponent implements OnInit, OnDestroy {

  users: any;
  $_current_user: Subscription; 
  current_user: any;

  constructor(
    private user_store: Store<UserState>,
    private gallery_service: GalleryService,
    private chat_service: ChatService,
    private session_store: Store<SessionState>,
    private router: Router
  ) {


   }

   ngOnInit() {
     //console.log('Gallery');
    //this.gallery_store.dispatch(new galleryAction.Get());
    this.gallery_service.getList().subscribe((data: any) => {
       //console.log(data);
       this.user_store.dispatch(new UpdateUsers(data.results));
       this.users = this.user_store.select(selectGalleryUserList(data.results));
    });

    // Set current user from store
    this.$_current_user = this.session_store.select(selectUser).subscribe(user => {
      this.current_user = user;
    });

  }

  callToChat(user_id: number){
    let data = {
      'owner': this.current_user.id,
      'abonent': user_id
    }
    //console.log(user_id);
    //console.log(this.current_user);
    this.chat_service.addRoom(data).subscribe(data => {
      //console.log(data);
      
      this.router.navigate(['/dashboard/chat/room', data['id']])
    })
  }

  ngOnDestroy(){

  }

}
