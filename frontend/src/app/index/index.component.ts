
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {QLoginComponent} from '../auth/qlogin/qlogin.component';
import { FacadeService } from '../facade';


@Component({
  selector: 'app-index',
  templateUrl: '../templates/index/index.component.html',
  styleUrls: ['../templates/index/index.component.css'],
  providers: [QLoginComponent]
})
export class IndexComponent implements OnInit {

  man: any = [];
  woman: any = [];

  constructor(private _services: FacadeService,) {

    for(let i in [1,2,3,4,5,6,7,8,9,10]) {
      this.man.push({username: `man${i}`})
    }
    for(let i in [1,2,3,4,5,6,7,8,9,10]) {
      this.woman.push({username: `woman${i}`})
    }
   }

   login(user){
    this._services.loginService.logout();
    this._services.loginService.login({'username': user.username, 'password': user.username});
   }

   ngOnInit() {

  }


}
