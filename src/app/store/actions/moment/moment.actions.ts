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
// UPDATE
// ...
export const updateMoment = createAction(
  '[Moment] Update Moment',
  props<{ data: any, guid: string; }>()
);

export const updateMomentSuccess = createAction(
  '[Moment] Update Moment Success',
  props<{ data: any }>()
);

export const updateMomentFailure = createAction(
  '[Moment] Update Moment Failure',
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
export const loadMoments = createAction(
  '[Moment] Load Moments',
  props<{ data?: any; filter?: any }>()
);

export const loadMoreMoments = createAction(
  '[Moment] Load More Moments',
  props<{ data?: any; filter?: any; isLoadMore?: boolean; }>()
);

export const loadMomentsSuccess = createAction(
  '[Moment] Load Moments Success',
  props<{ data: any; filter?: any }>()
);

export const loadMomentsFailure = createAction(
  '[Moment] Load Moments Failure',
  props<{ error: any }>()
);


// ...
// LOADS MY MOMENT
// ...
export const loadMyMoments = createAction(
  '[Moment] Load My Moments',
  props<{ data?: any; filter?: any }>()
);

export const loadMoreMyMoments = createAction(
  '[Moment] Load More My Moments',
  props<{ data?: any; filter?: any; isLoadMore?: boolean; }>()
);

export const loadMyMomentsSuccess = createAction(
  '[Moment] Load My Moments Success',
  props<{ data: any; filter?: any }>()
);

export const loadMyMomentsFailure = createAction(
  '[Moment] Load My Moments Failure',
  props<{ error: any }>()
);


// ...
// UPDATE MY MOMENT
// ...
export const updateMyMoment = createAction(
  '[Moment] Update My Moment',
  props<{ data: any, guid: string; }>()
);

export const updateMyMomentSuccess = createAction(
  '[Moment] Update My Moment Success',
  props<{ data: any }>()
);

export const updateMyMomentFailure = createAction(
  '[Moment] Update My Moment Failure',
  props<{ error: any }>()
);


// ...
// DELETE MY MOMENT
// ...
export const deleteMyMoment = createAction(
  '[Moment] Delete My Moment',
  props<{ guid: string; }>()
);

export const deleteMyMomentSuccess = createAction(
  '[Moment] Delete My Moment Success',
  props<{ data: any }>()
);

export const deleteMyMomentFailure = createAction(
  '[Moment] Delete My Moment Failure',
  props<{ error: any }>()
);


// REFRESH
export const refreshMoments = createAction(
  '[Moment] Refresh Moments',
  props<{ data?: any; filter?: any }>()
);

export const refreshMomentsSuccess = createAction(
  '[Moment] Refresh Moments Success',
  props<{ data: any; filter?: any }>()
);

export const resetMomentStatus = createAction(
  '[Moment] Reset Moment Status'
);

export const resetMyMomentStatus = createAction(
  '[Moment] Reset My Moment Status'
);
