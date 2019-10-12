import { createSelector, createFeatureSelector } from '@ngrx/store';


export const getGalleryStateSelector = createFeatureSelector<GalleryState>('gallery');
import { pipe } from 'rxjs';
import { filter , concatMap } from 'rxjs/operators';
import { ChatContactComponent } from '../../chat/components/contact/chat.contact.component';
import { GalleryState } from './gallery.store';

export const selectUsersIds = createSelector(
  getGalleryStateSelector,
    (state: GalleryState) => state.ids
  );

  export const selectUsersList = createSelector(
    getGalleryStateSelector,
    (state: GalleryState) => state.results
  );

  export const getUserGalleryList = createSelector(
    selectUsersIds,
    selectUsersList,
    (ids, users) => {
      return ids.map( id => users[id])
    }
  )


  export const getUserById = (id) => createSelector(getUserGalleryList, (allItems) => {
    console.log(allItems);
    if (allItems) {
      return allItems.find(item => {
        return item.id === id;
      });
    } else {
      return {};
    }
  });
