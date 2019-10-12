import { Component, OnInit, OnDestroy, Inject, Input } from '@angular/core';
import { FacadeService } from '../../facade';
import { Observable, Subscription } from 'rxjs';
import { APP_CONFIG } from '../../settings';
import { selectIsAuth, selectUsername } from '../../store/session/session.selector';
import { Store } from '@ngrx/store';
import * as sessionActions from '../../store/session/session.action';
import { SessionState } from '../../store/session/session.store';

@Component({
  selector: 'app-qlogin',
  templateUrl: '../../templates/auth/qlogin.html',
  styles: []
})
export class QLoginComponent implements OnInit, OnDestroy {

  @Input() user: any;
  @Input() is_auth: Observable<boolean>;
  login_subscription: Subscription;
  logout_subscription: Subscription;
  domain = this.app_config.APIurl;
  username: Observable<string>;

  constructor(
    private _services: FacadeService,
    @Inject(APP_CONFIG) private app_config,
    private session_store: Store<SessionState>
    ) {
      this.username = this.session_store.select(selectUsername);
      this.is_auth = this.session_store.select(selectIsAuth);
    }

  ngOnInit() {

    this.login_subscription  = this._services.loginService.login$.subscribe( (result: any) => {
       //result.status==0 ? this.is_auth = true : alert(result.message);
       this.username = result.username;
    }, (error) => {
      alert(error);
    });
    this.logout_subscription = this._services.loginService.logout$.subscribe(result => {
      //this.is_auth = false;
    });
  }
  login(){
    this._services.loginService.login({'username': this.user.username, 'password': this.user.password});
  }
  logout(){
    this._services.loginService.logout();

  }

  ngOnDestroy(){
    this.login_subscription.unsubscribe();
    this.logout_subscription.unsubscribe();
  }
}
