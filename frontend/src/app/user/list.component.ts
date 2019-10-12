
import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as userActions from './../store/users/users.action';
import { getUserStateSelector } from '../store/users/users.selector';
import { User, UserState } from '../store/users/users.store';
import {UserService} from '../store/users/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: '../templates/user/list.component.html',
  styles: []
})
export class UserListComponent implements OnInit {
  users: UserState;
  currentPage: number = 1;

  constructor(
    private store: Store<UserState>,
    private http_service: UserService
    ) {

     this.store.select(getUserStateSelector).subscribe((data: UserState) => {
       this.users = data;
      });

   }

   ngOnInit() {
    this.getPage(this.currentPage);
  }

  getPage(page: number){
    console.log(`Getting page ${page}`);
    this.currentPage = page;
    this.store.dispatch(new userActions.GetUsers(this.currentPage));
  }


  doEdit(user: User){
    user.is_edit = true;
    //this.store.dispatch(new userActions.SetIsEditUser(user));
  }

  doSave(user: User){
    user.is_edit = false;
    console.log(user);
    this.http_service.saveUser(user).subscribe(data => {
      console.log(data);
    });
  }

  doCancel(user: User){
      user.is_edit = false;
  }
}
