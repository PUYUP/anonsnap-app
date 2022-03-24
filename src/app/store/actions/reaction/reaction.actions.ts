import { createAction, props } from '@ngrx/store';

// CREATE
export const createReaction = createAction(
  '[Reaction] Create Reaction',
  props<{ data: any }>()
);

export const createReactionSuccess = createAction(
  '[Reaction] Create Reaction Success',
  props<{ data: any }>()
);

export const createReactionFailure = createAction(
  '[Reaction] Create Reaction Failure',
  props<{ error: any }>()
);


// DELETE
export const deleteReaction = createAction(
  '[Reaction] Delete Reaction',
  props<{ guid: string }>()
);

export const deleteReactionSuccess = createAction(
  '[Reaction] Delete Reaction Success',
  props<{ data: any }>()
);

export const deleteReactionFailure = createAction(
  '[Reaction] Delete Reaction Failure',
  props<{ error: any }>()
);