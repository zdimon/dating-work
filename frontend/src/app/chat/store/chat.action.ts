import { Action } from '@ngrx/store';
import {RoomState, Room} from './chat.store';
import {User} from '../../store/users/users.store';



export enum ActionTypes {
  SetCurrentRoom = '[Room] Set current room',
  SendMessage = '[Room] Send message',
  GetMessage = '[Room] Get message from socket',
  MessageSent = '[Room] Message sent',
  GetRoomList = '[Room] Get room list',
  GetRoomListLoaded = '[Room] Room list loaded',
  RoomSelected = '[Room] Room selected',
  UpdateRoom = '[Room] Update room',
}



export class UpdateRoom implements Action {
  readonly type = ActionTypes.UpdateRoom;
  constructor(public payload: any) {}
}



export class MessageSent implements Action {
  readonly type = ActionTypes.MessageSent;
}

export class SetCurrentRoom implements Action {
  readonly type = ActionTypes.SetCurrentRoom;
  constructor(public payload: Room) {}
}

export class SendMessage implements Action {
  readonly type = ActionTypes.SendMessage;
  constructor(public payload: any) {}
}

export class GetMessage implements Action {
  readonly type = ActionTypes.GetMessage;
  constructor(public payload: any) {}
}

export class GetRoomList implements Action {
  readonly type = ActionTypes.GetRoomList;
}

export class RoomSelected implements Action {
  readonly type = ActionTypes.RoomSelected;
  constructor(public payload: any) {}
}

export class GetRoomListLoaded implements Action {
  readonly type = ActionTypes.GetRoomListLoaded;
  constructor(public payload: any) {}
}

export type ActionsUnion =  SetCurrentRoom  | SendMessage | MessageSent | GetRoomList | GetRoomListLoaded | GetMessage | RoomSelected | UpdateRoom
