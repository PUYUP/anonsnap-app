import { createAction, props } from '@ngrx/store';

// CREATE
export const createComment = createAction(
  '[Comment] Create Comment',
  props<{ data: any }>()
);

export const createCommentSuccess = createAction(
  '[Comment] Create Comment Success',
  props<{ data: any }>()
);

export const createCommentFailure = createAction(
  '[Comment] Create Comment Failure',
  props<{ error: any }>()
);

// UPDATE
export const updateComment = createAction(
  '[Comment] Update Comment',
  props<{ data: any, guid: string; }>()
);

export const updateCommentSuccess = createAction(
  '[Comment] Update Comment Success',
  props<{ data: any }>()
);

export const updateCommentFailure = createAction(
  '[Comment] Update Comment Failure',
  props<{ error: any }>()
);

// DELETE
export const deleteComment = createAction(
  '[Comment] Delete Comment',
  props<{ guid: string; }>()
);

export const deleteCommentSuccess = createAction(
  '[Comment] Delete Comment Success',
  props<{ data: any }>()
);

export const deleteCommentFailure = createAction(
  '[Comment] Delete Comment Failure',
  props<{ error: any }>()
);

// LOAD
export const resetCommentStatus = createAction(
  '[Comment] Reset Comment Status'
);

export const loadComments = createAction(
  '[Comment] Load Comments',
  props<{ data?: any; filter?: any }>()
);

export const loadMoreComments = createAction(
  '[Comment] Load More Comments',
  props<{ data?: any; filter?: any; isLoadMore: boolean; }>()
);

export const loadCommentsSuccess = createAction(
  '[Comment] Load Comments Success',
  props<{ data: any; filter?: any }>()
);

export const loadCommentsFailure = createAction(
  '[Comment] Load Comments Failure',
  props<{ error: any }>()
);
