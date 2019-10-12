import { PhotoState } from './photos.store';
import { createSelector, createFeatureSelector } from '@ngrx/store';

export const getPhotoStateSelector = createFeatureSelector<PhotoState>('photos');

export const selectPhotosIds = createSelector(
  getPhotoStateSelector,
  (state: PhotoState) => state.ids
);

export const selectPhotoList = createSelector(
  getPhotoStateSelector,
  (state: PhotoState) => state.results
);

export const getPhotoList = createSelector(
  selectPhotosIds,
  selectPhotoList,
  (ids, photos) => {
    return ids.map( id => photos[id])
  }
)
