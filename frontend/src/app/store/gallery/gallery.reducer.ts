import * as Actions from './gallery.action';
import { User } from '../users/users.store';
import { GalleryState, default_state } from './gallery.store';


export function GalleryReducer(state: GalleryState = default_state, action: Actions.ActionsUnion) {

  switch (action.type) {

    case Actions.ActionTypes.LoadSuccess:

      return {
        ...state,
        ids: action.payload.ids,
        results: action.payload.results
      };

      case Actions.ActionTypes.UpdateUser:

        return {
          ...state,
          results: Object.assign({}, state.results, action.payload)
        };

    default:
      return state;
  }
}
