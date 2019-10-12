import { Component, OnInit, OnDestroy, Inject, Input } from '@angular/core';
import { FacadeService } from '../../facade';
import { Observable, Subscription } from 'rxjs';
import { APP_CONFIG } from '../../settings';
import { selectIsAuth, selectUsername } from '../../store/session/session.selector';
import { Store } from '@ngrx/store';
import * as sessionActions from '../../store/session/session.action';
import { SessionState } from '../../store/session/session.store';
import {LoginService} from '../../service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: '../../templates/auth/login.html',
  styles: []
})
export class MainLoginComponent implements OnInit {

   user: any = {
     username: 'woman1',
     password: 'woman1'
   };

   man: any = [];
   woman: any = [];

  constructor(
      private login_service: LoginService
    ) {

      for(let i in [1,2,3,4,5,6,7,8,9]) {
        this.man.push({username: `man${parseInt(i)+1}`})
      }
      for(let i in [1,2,3,4,5,6,7,8,9]) {
        this.woman.push({username: `woman${parseInt(i)+1}`})
      }

    }

  ngOnInit() {


  }

  login(){
    this.login_service.login({'username': this.user.username, 'password': this.user.password});
  }

  autologin(user){
    this.login_service.logout();
    this.login_service.login({'username': user.username, 'password': user.username});
  }
}
