import { SocketService } from './../service/socket.service';

import { Component, OnInit } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

/// Store
import { Store } from '@ngrx/store';
import { SessionState } from '../store/session/session.store';
import {selectUser, selectLanguage} from '../store/session/session.selector';
import * as sessionActions from '../store/session/session.action';
import { User } from '../store/users/users.store';
import {LoginService} from '../service/login.service';
import { SetLanguage, AddAccountSuccess } from '../store/session/session.action';
import { TokenService } from '../service/token.service';

@Component({
  selector: 'app-index',
  templateUrl: '../templates/base/base.component.html',
  styleUrls: ['../templates/base/base.component.css'],
})
export class BaseComponent implements OnInit {
  lang: string;
  user: any;
  constructor(
    private translate: TranslateService,
    private session_store: Store<SessionState>,
    private login_service: LoginService,
    private token_service: TokenService,
    private socket_service: SocketService,
    ) {

      this.socket_service.update_session$.subscribe((data: any) => {
        //console.log(data.data.user);
        this.session_store.dispatch(new sessionActions.UpdateUser(data.data.user));
      })

      translate.setDefaultLang('en');

      this.lang = 'en';
      this.user = this.session_store.select(selectUser);
      this.session_store.select(selectLanguage).subscribe( lang => {
        this.lang = lang;
        translate.use(this.lang);
      });
   }



   ngOnInit() {

  }

  doSetLang(lang: string){
    this.translate.use(lang);
    this.lang = lang;
    this.session_store.dispatch(new SetLanguage(lang));
    this.token_service.setLanguage(lang);
  }

  doLogout(event: any){
    this.login_service.logout();
  }

}
