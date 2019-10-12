
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-chat-contact',
  templateUrl: './chat.contact.component.html',
  styleUrls: ['./chat.contact.component.css']
})
export class ChatContactComponent implements OnInit {

  @Input() contacts: any;
  @Output() select = new EventEmitter();

  constructor() {}

   ngOnInit() {

  }



}
