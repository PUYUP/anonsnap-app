import { createAction, props } from '@ngrx/store';

export const ChangeFilterRadius = createAction(
  '[FilterRadius] Change Filter Radius'
);

export const ChangeFilterRadiusSuccess = createAction(
  '[FilterRadius] Change Filter Radius Success',
  props<{ data?: any }>()
);

export const ChangeFilterRadiusFailure = createAction(
  '[FilterRadius] Change Filter Radius Failure',
  props<{ error: any }>()
);
