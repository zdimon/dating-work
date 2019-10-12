import {Injectable, Inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { APP_CONFIG } from '../settings';


//import { getSessionStateSelector } from '../store/session/session.selector';
import { Store } from '@ngrx/store';
import { SessionService } from './session.service';

// User store
//import { UpdateUsers } from '../store/users/users.action';
//import { UserState } from '../store/users/users.store';

import { SessionState } from './store/session.store';
import * as sessionActions from './store/session.action';


@Injectable()
export class InitService {

  constructor(
    @Inject(APP_CONFIG) private app_config,
    private http: HttpClient,
    private session_store: Store<SessionState>,
    private session_service: SessionService,
    //private user_state: Store<UserState>
    ){
      //this.session_store.select(getSessionStateSelector);
    }

  public init() {
    this.http.get(`${this.app_config.APIurl}/init`).subscribe(
      (data: any) => {
        /// set session user
        this.session_store.dispatch(new sessionActions.Init(data));
        // set online users
        //this.user_state.dispatch(new UpdateUsers(data.users_online));
      },
      err => {
        this.session_service.removeToken();
      }
    );
  }
}
