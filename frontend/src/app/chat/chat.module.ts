// modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import {SharedModule} from '../shared.module';
import {ChatRoutingModule} from './chat.routing.module';

// services
import { OnlineService } from '../store/online/online.service';
import {WebRtcService} from '../service/webrts.service';
import { ChatService } from '../service/chat.service';

/// components
import { ChatMessageItemComponent } from './components/room/message.item.component';
import { BaseChatComponent } from './components/base/base.chat.component';
import { RoomChatComponent } from './components/room/room.chat.component';
import { IndexChatComponent } from './components/index/index.chat.component';
import {OwnerVideoComponent} from './components/video/owner.video.component';
import {AbonentVideoComponent} from './components/video/abonent.video.component';
import { ChatContactComponent} from './components/contact/chat.contact.component';

// pipes
import { ParseSmilePipe } from '../_core/pipes/smile.parser.pipe';

@NgModule({
  declarations: [
    ChatContactComponent,
    OwnerVideoComponent,
    AbonentVideoComponent,
    ChatMessageItemComponent,
    BaseChatComponent,
    RoomChatComponent,
    IndexChatComponent,
    ParseSmilePipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    ChatRoutingModule,
    SharedModule
  ],
  exports: [],
  providers: [OnlineService, WebRtcService, ChatService]
})
export class ChatModule { }
