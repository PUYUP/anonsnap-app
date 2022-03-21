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

export const refreshMomentsFeature = createFeatureSelector<AppState>('refreshMoments');
export const SelectRefreshedMoments = createSelector(
	refreshMomentsFeature,
	(state: any) => {
		return state;
  	}
);

// MY MOMENT
export const loadMyMomentsFeature = createFeatureSelector<AppState>('loadMyMoments');
export const SelectLoadedMyMoments = createSelector(
	loadMyMomentsFeature,
	(state: any) => {
		return state;
  	}
);

export const updateMyMomentFeature = createFeatureSelector<AppState>('updateMyMoment');
export const SelectUpdatedMyMoment = createSelector(
	updateMyMomentFeature,
	(state: any) => {
		return state;
  	}
);

export const deleteMyMomentFeature = createFeatureSelector<AppState>('deleteMyMoment');
export const SelectDeletedMyMoment = createSelector(
	deleteMyMomentFeature,
	(state: any) => {
		return state;
  	}
);