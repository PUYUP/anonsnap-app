import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../../app.state';

export const createCommentFeature = createFeatureSelector<AppState>('createComment');
export const SelectCreatedComment = createSelector(
	createCommentFeature,
	(state: any) => {
		return state;
  	}
);

export const updateCommentFeature = createFeatureSelector<AppState>('updateComment');
export const SelectUpdatedComment = createSelector(
	updateCommentFeature,
	(state: any) => {
		return state;
  	}
);

export const loadCommentsFeature = createFeatureSelector<AppState>('commentList');
export const SelectLoadedComments = createSelector(
	loadCommentsFeature,
	(state: any) => {
		return state;
  	}
);