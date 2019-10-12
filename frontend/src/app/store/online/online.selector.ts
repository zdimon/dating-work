import { createSelector, createFeatureSelector } from '@ngrx/store';
import { OnlineState } from './online.store';
import { RoomState } from '../../chat/store/chat.store';
import {getContactsIds} from '../../chat/store/chat.selector';
export const getOnlineStateSelector = createFeatureSelector<OnlineState>('online');
import { pipe } from 'rxjs';
import { filter , concatMap } from 'rxjs/operators';
import { ChatContactComponent } from '../../chat/components/contact/chat.contact.component';

export const selectUsersIds = createSelector(
    getOnlineStateSelector,
    (state: OnlineState) => state.users_ids
  );

  export const selectUsersList = createSelector(
    getOnlineStateSelector,
    (state: OnlineState) => state.users
  );

  export const getUserOnlineList = createSelector(
    selectUsersIds,
    selectUsersList,
    (ids, users) => {
      return ids.map( id => users[id])
    }
  )

  export const getUserOnlineExludeList = createSelector(
    selectUsersIds,
    getContactsIds,
    selectUsersList,
    (online, contact, ol) => {
    return online.filter(id => !contact.includes(id)).map(iddd => ol[iddd])
    //return online.concatMap(array => array)

    /*
       console.log(online);
       console.log(contact);  
    return ol.map(userobj => {
        contact.filter((id) => {
        id == userobj.id
        }).map(idd => userobj[idd])
    );
      //return contact.map( id => online[id])
    
    */
     //return ol;

    }
  )