import { Action, createReducer, on } from '@ngrx/store';
import { resetGeolocationStatus, requestGeolocation, requestGeolocationFailure, requestGeolocationSuccess } from '../../actions/location/location.actions';


export const locationGeolocationFeatureKey = 'locationGeolocation';

export interface LocationGeolocationState {
  data: any;
  error: any;
  status: string;
}

export const initialState: LocationGeolocationState = {
  data: null,
  error: null,
  status: 'init',
};

export const reducer = createReducer(
  initialState,

  on(requestGeolocation, (state, payload) => {
    return {
      ...state,
      status: 'loading'
    }
  }),
  on(requestGeolocationSuccess, (state, payload) => {
    return {
      ...state,
      data: {
        ...payload.data
      },
      error: null,
      status: 'loaded'
    }
  }),
  on(requestGeolocationFailure, (state, payload) => {
    return {
      ...state,
      data: null,
      error: {
        ...payload.error
      },
      status: 'init'
    }
  }),
  on(resetGeolocationStatus, (state, payload) => {
    return {
      ...state,
      status: 'init'
    }
  }),
);
export function LocationGeolocationReducer(state: LocationGeolocationState, action: Action) {
  return reducer(state, action);
}