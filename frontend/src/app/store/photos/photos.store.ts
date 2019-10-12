export interface Photo {
  id: number;
  image_big: string;
  image_small: string;
  image_middle: string;
  user: string;
  is_main: boolean;
  is_approved: boolean;
  is_deleted: boolean;
  cropping: string;
  croppos: string;
}

export interface PhotoState {
  ids: number[];
  results: {[id: number]: any};
}

export const default_state = {
  ids:  [],
  results: {}
}


