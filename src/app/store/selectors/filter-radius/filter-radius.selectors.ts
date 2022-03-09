import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../../app.state';

export const selectFeature = createFeatureSelector<AppState>('filterRadius');

export const SelectFilterRadius = createSelector(
	selectFeature,
	(state: any) => {
		return state?.data;
  	}
);