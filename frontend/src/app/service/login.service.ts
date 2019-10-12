
import {Injectable, Inject} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, ReplaySubject} from "rxjs";
import { Injector } from '@angular/core';
import { APP_CONFIG } from '../settings';
import { Store } from '@ngrx/store';
import * as sessionActions from '../store/session/session.action';
import { SessionState } from '../store/session/session.store';
import { getSessionStateSelector } from '../store/session/session.selector';
import {User} from '../store/users/users.store';
import {TokenService} from '../service/token.service';
import {Router} from "@angular/router"

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

  private socket_service: any;

  constructor(
    private http: HttpClient,
    public injector: Injector,
    private router: Router,
    @Inject(APP_CONFIG) private app_config,
    private session_store: Store<SessionState>,
    private token_service: TokenService
  ) {

    this.session_store.select(getSessionStateSelector).subscribe((data: SessionState) =>{
      this.current_user = data.user;
    })

  }

  injectSocketService(socket_service: any){
    this.socket_service = socket_service;
  }

  // используем http.post() для получения токена
  public login(user) {
    this.token_service.removeToken();
    user.socket_id = this.token_service.getSid();
    this.http.post(`${this.app_config.APIurl}/api-token-auth/`,user).subscribe(
      (data: any) => {
        this.token_service.setToken(data['token'])
        this.token_service.setLanguage(data['language'])
        this.session_store.dispatch(new sessionActions.LogIn(data));
        this.router.navigate(['/dashboard'])
      },
      err => {
        this._login_emmiter.next({status: 1, message: 'Invalid login or password'});
        this.errors = err['error'];
      }
    );
  }



  public logout() {

    this.http.get(`${this.app_config.APIurl}/logout/`).subscribe(data => {
      this.token_service.removeToken();
      //this.socket_service.set_me_offnline(this.current_user.username);
      this.session_store.dispatch(new sessionActions.LogOut());
      this.router.navigate(['/login'])
    });
  }



}
