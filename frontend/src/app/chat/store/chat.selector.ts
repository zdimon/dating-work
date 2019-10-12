import { RoomState } from './chat.store';
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { UserState } from '../../store/users/users.store';

export const getRoomStateSelector = createFeatureSelector<RoomState>('rooms');

const getUserStateSelector = createFeatureSelector<UserState>('users');

const selectUsersIDsList = createSelector(
  getUserStateSelector,
  (state: UserState) => state.results
);


export const selectCurrentRoom = createSelector(
    getRoomStateSelector,
    selectUsersIDsList,
    (state: RoomState, users) => {
      let room = state.rooms[state.current_room];
      if(room){
        let messages = [];
        //console.log(room);

        for(const key in room.messages) {
          if (users[room.messages[key].author_id]) {
            room.messages[key].author = users[room.messages[key].author_id];
            messages.push(room.messages[key]);
          }
        }
        room.messages = messages;
        if(room.abonent)
          room.abonent = users[room.abonent_id];
        return room;
      }
    }
  );



export const getRoomIds = createSelector(
  getRoomStateSelector,
  (state: RoomState) => state.rooms_ids
)

export const getContactsIds = createSelector(
  getRoomStateSelector,
  (state: RoomState) => state.contacts_ids
)

export const getRooms = createSelector(
  getRoomStateSelector,
  (state: RoomState) => state.rooms
)

/// Normalize all rooms

export const getRoomList = createSelector(
  getRoomIds,
  getRooms,
  selectUsersIDsList,
  (ids, rooms, users) => {
    return ids.map( id => {
      let room = rooms[id];
      let messages = [];
      for(const key in room.messages) {
        messages.push(room.messages[key]);
      }

      room.messages = messages;
      room.abonent = users[room.abonent_id];
      return room;
    })
  }
)
