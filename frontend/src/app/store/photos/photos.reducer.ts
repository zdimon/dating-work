import { PhotoState, Photo, default_state } from './photos.store';
import * as Actions from './photos.action';

export function PhotoReducer(state: PhotoState = default_state, action: Actions.ActionsUnion) {

  switch (action.type) {



    case Actions.ActionTypes.LoadSuccess:

      return {
        ...state,
        ids: action.payload.ids,
        results: action.payload.results,

      };

    case Actions.ActionTypes.Add:
      return {
        ...state,
        results: Object.assign({}, state.results, action.payload),
        //results: [ ...state.results, action.payload], TOASK
        ids: [ ...state.ids, action.payload.id]

      };

      case Actions.ActionTypes.UpdatePhoto:
        return {
          ...state,
          results: Object.assign({}, state.results, action.payload),
  
        };

    /*
    case Actions.ActionTypes.Remove:
      return {
        ...state,
        results: [...state.results.filter(item => item.id !== action.payload.id)]
      };
    */

    default:
      return state;
  }
}
