
import {Injectable, Inject} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, ReplaySubject} from "rxjs";
import { Injector } from '@angular/core';
import { APP_CONFIG } from '../settings';
import { Store } from '@ngrx/store';
import * as sessionActions from './store/session.action';
import { SessionState } from './store/session.store';
import { getSessionStateSelector } from './store/session.selector';
import {User} from '../main/apps/users/store/users.store';
import {SessionService} from './session.service';
import {Router} from "@angular/router";
import { SocketService } from '../socket/socket.service';



@Injectable()
export class LoginService {

  private _login_emmiter = new ReplaySubject();
  private _logout_emmiter = new ReplaySubject();
  login$ = this._login_emmiter.asObservable();
  logout$ = this._logout_emmiter.asObservable();

  // current user
  public current_user: User;

  // сообщения об ошибках авторизации
  public errors: any = [];



  constructor(
    private http: HttpClient,
    public injector: Injector,
    private router: Router,
    @Inject(APP_CONFIG) private app_config,
    private session_store: Store<SessionState>,
    private session_service: SessionService,
    private _socketService: SocketService
  ) {

    this.session_store.select(getSessionStateSelector).subscribe((data: SessionState) =>{
      this.current_user = data.user;
    })

  }


  // используем http.post() для получения токена
  public login(user) {
    this.session_service.removeToken();
    user.socket_id = this.session_service.getSid();
    this.http.post(`${this.app_config.APIurl}/api-token-auth/`,user).subscribe(
      (data: any) => {
        this.session_service.setToken(data['token'])
        this.session_service.setLanguage(data['user']['language'])
        this.session_store.dispatch(new sessionActions.LogIn(data));
        this.router.navigate(['/apps/index'])
      },
      err => {
        this._login_emmiter.next({status: 1, message: 'Invalid login or password'});
        this.errors = err['error'];
        console.log('login error')
      }
    );
  }



  public logout() {

    this.http.get(`${this.app_config.APIurl}/logout/`).subscribe(data => {
      this.session_service.removeToken();
      this._socketService.reconnect();
      //this.socket_service.set_me_offnline(this.current_user.username);
      this.session_store.dispatch(new sessionActions.LogOut());
      this.router.navigate(['pages/auth/login'])
    });
  }



}
