import { User } from '../../store/users/users.store';

export interface Message {
  author_id: number;
  author?: User;
  message: string;
  created: string;
}

export interface Room {
  id: number;
  messages: {[id: number]: Message};
  abonent_id: number;
  abonent?: User;
  is_active: boolean;
  is_low_account: boolean;
  activity: number;

}

export interface RoomState {
  count: number;
  rooms_ids:  number[];
  contacts_ids: number[];
  rooms: {[id: number]: Room}
  current_room: number;
}

export const default_state = {
  count: 0,
  rooms_ids:  [],
  contacts_ids: [],
  rooms: {},
  current_room: null
}
