import * as Actions from './online.action';
import { User } from '../users/users.store';
import { OnlineState, default_state } from './online.store';


export function OnlineReducer(state: OnlineState = default_state, action: Actions.ActionsUnion) {

  switch (action.type) {

    case Actions.ActionTypes.LoadSuccess:

      return {
        ...state,
        users_ids: action.payload.users_ids,
        users: action.payload.users
      };

    case Actions.ActionTypes.Add:
      return {
        ...state,
        users: { ...action.payload, ...state.users},
        users_ids: [action.payload.id,...state.users_ids]
      };

    case Actions.ActionTypes.Remove:
      return {
        ...state
      };


    default:
      return state;
  }
}
