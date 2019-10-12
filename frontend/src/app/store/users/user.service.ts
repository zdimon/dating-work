
import {Injectable, Inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Injector } from '@angular/core';
import { APP_CONFIG } from '../../settings';
import {User} from './users.store';

@Injectable()
export class UserService {


  constructor(
    private http: HttpClient,
    public injector: Injector,
    @Inject(APP_CONFIG) private app_config,
  ) {
  }

  public getUserList(page:number) {
    page==1 ? page = 0: page = page;
    let offset = page*10;
    return this.http.get(`${this.app_config.APIurl}/users/?limit=10&offset=${offset}`);
  }

  public saveUser(user: User){
    return this.http.put(`${this.app_config.APIurl}/users/${user.id}/`,user);
  }

  public addUser(user: User){
    return this.http.post(`${this.app_config.APIurl}/users`,user);
  }

}
