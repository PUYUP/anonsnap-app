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

export const deleteCommentFeature = createFeatureSelector<AppState>('deleteComment');
export const SelectDeletedComment = createSelector(
	deleteCommentFeature,
	(state: any) => {
		return state;
  	}
);

export const loadCommentsFeature = createFeatureSelector<AppState>('listComment');
export const SelectLoadedComments = createSelector(
	loadCommentsFeature,
	(state: any) => {
		return state;
  	}
);


// MY COMMENT
export const createMyCommentFeature = createFeatureSelector<AppState>('createMyComment');
export const SelectCreatedMyComment = createSelector(
	createMyCommentFeature,
	(state: any) => {
		return state;
  	}
);

export const updateMyCommentFeature = createFeatureSelector<AppState>('updateMyComment');
export const SelectUpdatedMyComment = createSelector(
	updateMyCommentFeature,
	(state: any) => {
		return state;
  	}
);

export const deleteMyCommentFeature = createFeatureSelector<AppState>('deleteMyComment');
export const SelectDeletedMyComment = createSelector(
	deleteMyCommentFeature,
	(state: any) => {
		return state;
  	}
);

export const loadMyCommentsFeature = createFeatureSelector<AppState>('listMyComment');
export const SelectLoadedMyComments = createSelector(
	loadMyCommentsFeature,
	(state: any) => {
		return state;
  	}
);