import * as Actions from './session.action';
import {SessionState, default_state} from './session.store';
import { SetLanguage } from './session.action';



export function SessionReduser(state: SessionState = default_state, action: Actions.ActionsUnion) {

  switch (action.type) {

    case Actions.ActionTypes.Init:

      return {
        ...state,
        user: action.payload.user,
        is_auth: true,
        token: action.payload.token
      };

      case Actions.ActionTypes.SetSID:

        return {
          ...state,
          sid: action.payload
        };

      case Actions.ActionTypes.SetToken:

          return {
            ...state,
            token: action.payload
          };

      case Actions.ActionTypes.LogOut:

        return {
          ...state,
          token: '',
          is_auth: false,
          user: {}
        };

      case Actions.ActionTypes.LogIn:

          return {
            ...state,
            token: action.payload.token,
            is_auth: true,
            user: action.payload.user
          };

      case Actions.ActionTypes.AddAccountSuccess:

          return {
            ...state,
            user: action.payload
          };

      case Actions.ActionTypes.UpdateUser:

            return {
              ...state,
              user: action.payload
            };

      case Actions.ActionTypes.SetMainPhoto:

        return {
          ...state,
          user: {...state.user, main_photo: action.payload}
        };

      case Actions.ActionTypes.SetLanguage:

        return {
          ...state,
          user: {...state.user, language: action.payload}
        };

    default:
      return state;
  }
}
