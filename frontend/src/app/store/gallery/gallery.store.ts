import { User } from '../users/users.store';

export interface GalleryState {
  ids: number[];
  results:  {[id: number]: User};
}

export const default_state = {
  ids: [],
  results: {}
}
