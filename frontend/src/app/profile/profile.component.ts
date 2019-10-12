import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectLanguage } from '../store/session/session.selector';
import { SessionState } from '../store/session/session.store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: '../templates/profile/profile.component.html',
  styles: []
})
export class ProfileComponent  implements OnInit{

  language: Observable<string>;

  constructor(
    private store: Store<SessionState>
  ){
     this.language = this.store.select(selectLanguage);
  }

  ngOnInit(){

  }



}
