import { AppState } from 'src/app/store/app.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const loadTagsFeature = createFeatureSelector<AppState>('loadTags');
export const SelectLoadedTags = createSelector(
	loadTagsFeature,
	(state: any) => {
		return state;
  	}
);