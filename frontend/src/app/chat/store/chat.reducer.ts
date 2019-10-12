import * as Actions from './chat.action';
import {RoomState, default_state} from './chat.store';
import { MessageSent } from './chat.action';



export function RoomReducer(state: RoomState = default_state, action: Actions.ActionsUnion) {

  switch (action.type) {

    case Actions.ActionTypes.UpdateRoom:
      //console.log('Updating room reducer')
      /*
      for (var key in state.rooms) {
        if(state.rooms[key].abonent === action.payload[Object.keys(action.payload)[0]].id)
        {
          state.rooms[key].abonent = action.payload[Object.keys(action.payload)[0]].id;
        }
      }
      */
      state.rooms[action.payload.id] = action.payload;
      return {
        ...state,
        rooms: {...state.rooms}
      };

      case Actions.ActionTypes.SetCurrentRoom:

        return {
          ...state,
          count: 21,
          current_room: action.payload.id,
        };






      case Actions.ActionTypes.SendMessage:
          //console.log('SendMessage room reducer')
          let rm = Object.assign({}, state.rooms[action.payload.room_id].messages)
          //console.log(state.rooms[action.payload.room_id].messages)

          let nm = {
            message: action.payload.message,
            author_id: action.payload.user_id,
            id: action.payload.id,
            created: action.payload.created
          }
          rm[action.payload.id] = nm;
          //console.log(rm)
          //state.rooms[action.payload.room_id].messages[action.payload.id] = nm;
          //state.rooms[action.payload.room_id].messages = desmessages;

          return state



          case Actions.ActionTypes.GetMessage:
            //console.log('GetMessage room reducer')
            let outrooms = {...state};
            let newroom = outrooms.rooms[action.payload.room_id];
            let mes = {
              'message': action.payload.message,
              'author_id': action.payload.user.id,
              'created': action.payload.time
            }
            newroom.messages[action.payload.message.id] = mes;
            outrooms.rooms[action.payload.room_id] = newroom;
            return outrooms;

          case Actions.ActionTypes.GetRoomListLoaded:

            let rooms = {
              ...state,
              rooms_ids: action.payload.room_ids,
              contacts_ids: action.payload.contacts_ids,
              rooms: action.payload.rooms,
              current_room: action.payload.current_room
            }
            //rooms.current_room = action.payload.rooms[action.payload.current_room]
            return rooms;

    default:
      return state;
  }
}
