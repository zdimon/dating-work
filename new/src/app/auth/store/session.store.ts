import { User } from '../../main/apps/users/store/users.store';


export interface SessionState {
  sid: string;
  token: string;
  is_auth: boolean;
  user: User|any;
}

export const default_state = {
  sid: '',
  token: '',
  is_auth: false,
  user: {}
}
