import { createAction, props } from '@ngrx/store';

// FILTER
export const FilterMoment = createAction(
  '[Filter] Filter Moment',
  props<{ data?: any }>()
);

export const FilterMomentSuccess = createAction(
  '[Filter] Filter Moment Success',
  props<{ data?: any }>()
);

export const FilterMomentFailure = createAction(
  '[Filter] Filter Moment Failure',
  props<{ error: any }>()
);

// FILTER RADIUS
export const FilterRadius = createAction(
  '[Filter] Change Filter Radius',
  props<{ data?: any }>()
);

export const FilterRadiusSuccess = createAction(
  '[Filter] Change Filter Radius Success',
  props<{ data?: any }>()
);

export const FilterRadiusFailure = createAction(
  '[Filter] Change Filter Radius Failure',
  props<{ error: any }>()
);

// MAP RADIUS
export const FilterMapRadius = createAction(
  '[Filter] Filter Map Radius',
  props<{ data?: any }>()
);

export const FilterMapRadiusSuccess = createAction(
  '[Filter] Filter Map Radius Success',
  props<{ data?: any }>()
);

export const FilterMapRadiusFailure = createAction(
  '[Filter] Filter Map Radius Failure',
  props<{ error: any }>()
);

// CALENDAR
export const FilterCalendar = createAction(
  '[Filter] Filter Calendar',
  props<{ data?: any }>()
);

export const FilterCalendarSuccess = createAction(
  '[Filter] Filter Calendar Success',
  props<{ data?: any }>()
);

export const FilterCalendarFailure = createAction(
  '[Filter] Filter Calendar Failure',
  props<{ error: any }>()
);