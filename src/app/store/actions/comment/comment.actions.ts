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
  props<{ data?: any; filter?: any; isLoadMore?: boolean; }>()
);

export const loadCommentsSuccess = createAction(
  '[Comment] Load Comments Success',
  props<{ data: any; filter?: any }>()
);

export const loadCommentsFailure = createAction(
  '[Comment] Load Comments Failure',
  props<{ error: any }>()
);


// CREATE MY COMMENT
export const createMyComment = createAction(
  '[Comment] Create My Comment',
  props<{ data: any }>()
);

export const createMyCommentSuccess = createAction(
  '[Comment] Create My Comment Success',
  props<{ data: any }>()
);

export const createMyCommentFailure = createAction(
  '[Comment] Create My Comment Failure',
  props<{ error: any }>()
);

// UPDATE MY COMMENT
export const updateMyComment = createAction(
  '[Comment] Update My Comment',
  props<{ data: any, guid: string; }>()
);

export const updateMyCommentSuccess = createAction(
  '[Comment] Update My Comment Success',
  props<{ data: any }>()
);

export const updateMyCommentFailure = createAction(
  '[Comment] Update My Comment Failure',
  props<{ error: any }>()
);

// DELETE MY COMMENT
export const deleteMyComment = createAction(
  '[Comment] Delete My Comment',
  props<{ guid: string; }>()
);

export const deleteMyCommentSuccess = createAction(
  '[Comment] Delete My Comment Success',
  props<{ data: any }>()
);

export const deleteMyCommentFailure = createAction(
  '[Comment] Delete My Comment Failure',
  props<{ error: any }>()
);

// LOAD MY COMMENT
export const resetMyCommentStatus = createAction(
  '[Comment] Reset My Comment Status'
);

export const loadMyComments = createAction(
  '[Comment] Load My Comments',
  props<{ data?: any; filter?: any }>()
);

export const loadMoreMyComments = createAction(
  '[Comment] Load More My Comments',
  props<{ data?: any; filter?: any; isLoadMore?: boolean; }>()
);

export const loadMyCommentsSuccess = createAction(
  '[Comment] Load My Comments Success',
  props<{ data: any; filter?: any }>()
);

export const loadMyCommentsFailure = createAction(
  '[Comment] Load My Comments Failure',
  props<{ error: any }>()
);
