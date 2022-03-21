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

// FILTER MAP
export const FilterMap = createAction(
  '[Filter] Filter Map',
  props<{ data?: any }>()
);

export const FilterMapSuccess = createAction(
  '[Filter] Filter Map Success',
  props<{ data?: any }>()
);

export const FilterMapFailure = createAction(
  '[Filter] Filter Map Failure',
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

// TAG
export const FilterTag = createAction(
  '[Filter] Filter Tag',
  props<{ name?: string }>()
);

export const FilterTagSuccess = createAction(
  '[Filter] Filter Tag Success',
  props<{ data?: any }>()
);

export const FilterTagFailure = createAction(
  '[Filter] Filter Tag Failure',
  props<{ error: any }>()
);