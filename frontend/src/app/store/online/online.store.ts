import { User } from '../users/users.store';

export interface OnlineState {
  users_ids: number[];
  users:  {[id: number]: User};
}

export const default_state = {
  users_ids: [],
  users: {}
}
