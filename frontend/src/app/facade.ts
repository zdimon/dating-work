import { LoginService } from './service/login.service';
import { Injector, Injectable } from '@angular/core';
import { SocketService } from './service/socket.service';


@Injectable()
export class FacadeService {

  private _loginService: LoginService;
  private _socketService: SocketService;

  public get loginService(): LoginService {
    if(!this._loginService){
      this._loginService = this.injector.get(LoginService);
      this._loginService.injectSocketService(this.injector.get(SocketService));
    }
    return this._loginService;
  }

  public get socketService(): SocketService {
    if(!this._socketService){
      this._socketService = this.injector.get(SocketService);
    }
    return this._socketService;
  }

  constructor(private injector: Injector) {  }

}
