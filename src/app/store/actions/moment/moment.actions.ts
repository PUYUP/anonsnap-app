import { createAction, props } from '@ngrx/store';

// ...
// CREATE
// ...
export const createMoment = createAction(
  '[Moment] Create Moment',
  props<{ data: any }>()
);

export const createMomentSuccess = createAction(
  '[Moment] Create Moment Success',
  props<{ data: any }>()
);

export const createMomentFailure = createAction(
  '[Moment] Create Moment Failure',
  props<{ error: any }>()
);


// ...
// EDIT
// ...
export const updateMoment = createAction(
  '[Moment] Edit Moment',
  props<{ data: any, guid: string; }>()
);

export const updateMomentSuccess = createAction(
  '[Moment] Edit Moment Success',
  props<{ data: any }>()
);

export const updateMomentFailure = createAction(
  '[Moment] Edit Moment Failure',
  props<{ error: any }>()
);


// ...
// DELETE
// ...
export const deleteMoment = createAction(
  '[Moment] Delete Moment',
  props<{ guid: string; }>()
);

export const deleteMomentSuccess = createAction(
  '[Moment] Delete Moment Success',
  props<{ data: any }>()
);

export const deleteMomentFailure = createAction(
  '[Moment] Delete Moment Failure',
  props<{ error: any }>()
);


// ...
// LOADS
// ...
export const addMoment = createAction(
  '[Moment] Add Moment',
  props<{ data?: any }>()
);

export const loadMoments = createAction(
  '[Moment] Load Moments',
  props<{ data?: any; filter?: any }>()
);

export const loadMoreMoments = createAction(
  '[Moment] Load More Moments',
  props<{ data?: any; filter?: any; isLoadMore: boolean; }>()
);

export const loadMomentsSuccess = createAction(
  '[Moment] Load Moments Success',
  props<{ data: any; filter?: any }>()
);

export const loadMomentsFailure = createAction(
  '[Moment] Load Moments Failure',
  props<{ error: any }>()
);

export const refreshMoments = createAction(
  '[Moment] Refresh Moments',
  props<{ data?: any; filter?: any }>()
);

export const resetMomentStatus = createAction(
  '[Moment] Reset Moment Status'
);