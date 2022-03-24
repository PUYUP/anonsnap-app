import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../../app.state';

export const createReactionFeature = createFeatureSelector<AppState>('createReaction');
export const SelectCreatedReaction = createSelector(
	createReactionFeature,
	(state: any) => {
		return state;
  	}
);

export const deleteReactionFeature = createFeatureSelector<AppState>('deleteReaction');
export const SelectDeletedReaction = createSelector(
	deleteReactionFeature,
	(state: any) => {
		return state;
  	}
);