import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../../app.state';

export const selectFeature = createFeatureSelector<AppState>('filterRadius');
export const SelectFilterRadius = createSelector(
	selectFeature,
	(state: any) => {
		return state?.data;
  	}
);

export const filterMapRadiusFeature = createFeatureSelector<AppState>('filterMapRadius');
export const SelectFilterMapRadius = createSelector(
	filterMapRadiusFeature,
	(state: any) => {
		return state?.data;
  	}
);

export const filterCalendarFeature = createFeatureSelector<AppState>('filterCalendar');
export const SelectFilterCalendar = createSelector(
	filterCalendarFeature,
	(state: any) => {
		return state?.data;
  	}
);