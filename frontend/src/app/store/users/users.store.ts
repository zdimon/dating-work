export interface User {
  id: number;
  username: string;
  email: string;
  groups: string[];
  is_superuser: boolean;
  is_edit: boolean;
  is_online: boolean;
  main_photo: string;
  middle_photo: string;
  about_me: string;
  account: number;
  language: string;
  gender: string;
}

export interface UserState {
  ids: number[];
  results:  {[id: number]: User};
}

export const default_state = {
  ids: [],
  results: {}
}
