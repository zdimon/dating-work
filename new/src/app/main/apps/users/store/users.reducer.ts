import { UserActionsUnion, UserActionTypes } from './users.action';
import { UserState, User, default_state } from './users.store';




export function UserReducer(state: UserState = default_state, action: UserActionsUnion) {
  switch (action.type) {
    case UserActionTypes.LoadSuccess:
      return {
        ...state,
        ids: action.payload.ids,
        results: action.payload.results,
      };


    case UserActionTypes.UpdateUsers:
        let oldids = [...state.ids];
        let newids = [];
        for (var key in action.payload) {
          newids.push(action.payload[key].id);
        }
        newids.forEach(function(value){
          if (oldids.indexOf(value)==-1) oldids.push(value);
        });

        return {
          ...state,
          ids: oldids,
          results: Object.assign({}, state.results, action.payload)
        };

    /*
    case UserActionTypes.Remove:
      return {
        ...state,
        results: [...state.results.filter(item => item.id !== action.payload.id)]
      };
    */

    default:
      return state;
  }
}
