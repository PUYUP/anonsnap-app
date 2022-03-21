import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../../app.state';

export const filterMapFeature = createFeatureSelector<AppState>('filterMap');
export const SelectFilterMap = createSelector(
	filterMapFeature,
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

export const filterTagFeature = createFeatureSelector<AppState>('filterTag');
export const SelectFilterTag = createSelector(
	filterTagFeature,
	(state: any) => {
		return state;
  	}
);