
import {Injectable, Inject} from '@angular/core';
import {Observable, of} from 'rxjs';


@Injectable()
export class TokenService {
  storage: any;
  constructor(){
    //this.storage = localStorage;
    this.storage = sessionStorage;
  }

  getToken(): string{
    return this.storage.getItem('access_token')
  }

  setToken(value: string){
    this.storage.setItem('access_token',value)
  }

  removeToken(){
    this.storage.removeItem('access_token');
  }


  getSid(): string{
    return this.storage.getItem('socket_id')
  }

  setSid(value: string){
    this.storage.setItem('socket_id',value)
  }

  getLanguage(): string{
    return this.storage.getItem('lang')
  }

  setLanguage(value: string){
    this.storage.setItem('lang',value)
  }

  removeSid(){
    this.storage.removeItem('socket_id');
  }

  public get isLoggedIn() : Observable<boolean> {
    return of(this.storage.getItem('access_token') !== null);
  }

}
