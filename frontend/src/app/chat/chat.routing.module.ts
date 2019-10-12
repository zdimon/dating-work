
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



//// components
import { RoomChatComponent } from './components/room/room.chat.component';
import { IndexChatComponent } from './components/index/index.chat.component';
//import {ChatComponent} from './chat.component';

export const chatRoutes: Routes = [
  { path: 'room/:id', component: RoomChatComponent},
  { path: 'index', component: IndexChatComponent},
  { path: '', redirectTo: 'index', pathMatch: 'full'},
];




@NgModule({
  imports: [],
  exports: [RouterModule]
})
export class ChatRoutingModule {}
