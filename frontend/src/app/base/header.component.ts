
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-base-header',
  templateUrl: '../templates/base/header.component.html'
})
export class HeaderComponent implements OnInit {

  @Input() lang;
  @Input() user;
  @Output() setlang = new EventEmitter();
  @Output() logout = new EventEmitter();

  constructor() {}

   ngOnInit() {

  }


}
