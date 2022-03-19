import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../../app.state';

export const createMomentFeature = createFeatureSelector<AppState>('createMoment');
export const SelectCreatedMoment = createSelector(
	createMomentFeature,
	(state: any) => {
		return state;
  	}
);

export const updateMomentFeature = createFeatureSelector<AppState>('updateMoment');
export const SelectUpdatedMoment = createSelector(
	updateMomentFeature,
	(state: any) => {
		return state;
  	}
);

export const deleteMomentFeature = createFeatureSelector<AppState>('deleteMoment');
export const SelectDeletedMoment = createSelector(
	deleteMomentFeature,
	(state: any) => {
		return state;
  	}
);

export const loadMomentsFeature = createFeatureSelector<AppState>('loadMoments');
export const SelectLoadedMoments = createSelector(
	loadMomentsFeature,
	(state: any) => {
		return state;
  	}
);