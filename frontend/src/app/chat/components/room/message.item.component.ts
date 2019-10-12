
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Message } from '../../store/chat.store';

@Component({
  selector: 'app-chat-message-item',
  templateUrl: './chat.message.item.component.html',
  styleUrls: ['./chat.message.item.component.css']
})
export class ChatMessageItemComponent implements OnInit {

  @Input() message: Message;


  constructor() {}

   ngOnInit() {

  }


}
