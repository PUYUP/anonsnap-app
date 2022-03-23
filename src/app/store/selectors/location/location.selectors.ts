import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../../app.state';

export const selectFeature = createFeatureSelector<AppState>('location');
export const SelectLocation = createSelector(
	selectFeature,
	(state: any) => {
		return state;
  	}
);

export const selectGeolocationFeature = createFeatureSelector<AppState>('locationGeolocation');
export const SelectGeolocation = createSelector(
	selectGeolocationFeature,
	(state: any) => {
		console.log(state)
		return state;
  	}
);