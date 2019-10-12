import { Component, OnInit, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-user-inline-form',
  templateUrl: '../templates/user/inline.form.component.html',
  styles: []
})
export class UserInlineFormComponent {
  @Output() save = new EventEmitter();

}
