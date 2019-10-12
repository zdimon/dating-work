
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../store/users/users.store';



@Component({
  selector: '[app-user-list-item]',
  templateUrl: '../templates/user/list.item.component.html',
  styles: []
})
export class UserListItemComponent implements OnInit {

  @Input() user: User;

  @Output() edit = new EventEmitter();
  @Output() save = new EventEmitter();
  @Output() cancel = new EventEmitter();

  constructor() {}

   ngOnInit() {

  }


}
