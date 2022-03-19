import { createAction, props } from '@ngrx/store';

// SAVE LOCATION
export const saveLocation = createAction(
  '[Location] Save Location',
  props<{ data: any }>()
);

export const saveLocationSuccess = createAction(
  '[Location] Save Location Success',
  props<{ data: any }>()
);

export const saveLocationFailure = createAction(
  '[Location] Save Location Failure',
  props<{ error: any }>()
);

// GET CURRENT USER LOCATION
export const requestGeolocation = createAction(
  '[Location] Request Geolocation',
  props<{ action?: string }>()
);

export const clearGeolocation = createAction(
  '[Location] Clear Geolocation'
);

export const requestGeolocationSuccess = createAction(
  '[Location] Request Geolocation Success',
  props<{ data: any }>()
);

export const requestGeolocationFailure = createAction(
  '[Location] Request Geolocation Failure',
  props<{ error: any }>()
);