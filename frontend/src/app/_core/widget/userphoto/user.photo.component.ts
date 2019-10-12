
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../../../store/users/users.store';

@Component({
  selector: 'app-user-photo',
  templateUrl: '../../../templates/core/widget/userphoto/user.photo.component.html',
  styleUrls: ['../../../templates/core/widget/userphoto/user.photo.component.css']
})
export class UserPhotoComponent implements OnInit {


  @Input() user;

  constructor() {}

   ngOnInit() {

  }


}
