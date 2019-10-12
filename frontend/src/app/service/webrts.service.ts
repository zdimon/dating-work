import {Injectable, Inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { APP_CONFIG } from '../settings';
import { SessionState } from '../store/session/session.store';
import { getSessionStateSelector } from '../store/session/session.selector';
import { Store } from '@ngrx/store';
import * as sessionActions from '../store/session/session.action';

@Injectable()
export class WebRtcService {

  constructor(
    @Inject(APP_CONFIG) private app_config,
    private http: HttpClient,
    private session_store: Store<SessionState>
    ){
      this.session_store.select(getSessionStateSelector);
    }

  public init() {
    console.log('Init webrtc');
  }

  public sendOffer(data: any){
    return this.http.post(`${this.app_config.APIurl}/webrtc/offer`, data );
  }

  public sendAnswer(data: any){
    return this.http.post(`${this.app_config.APIurl}/webrtc/answer`, data );
  }

  public sendIce(data: any){
    return this.http.post(`${this.app_config.APIurl}/webrtc/ice`, data );
  } 
}
