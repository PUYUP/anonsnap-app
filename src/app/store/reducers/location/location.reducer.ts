import { Action, createReducer, on } from '@ngrx/store';
import { saveLocation, saveLocationFailure, saveLocationSuccess } from '../../actions/location/location.actions';


export const locationFeatureKey = 'location';

export interface LocationState {
  data: any,
  error: any;
  status: string;
}

export const initialState: LocationState = {
  data: null,
  error: null,
  status: 'init',
};

export const reducer = createReducer(
  initialState,

  on(saveLocation, (state, payload) => {
    return {
      ...state,
      status: 'loading',
    }
  }),
  on(saveLocationSuccess, (state, payload) => {
    return {
      ...state,
      data: {
        ...payload.data
      },
      error: null,
      status: 'loaded',
    }
  }),
  on(saveLocationFailure, (state, payload) => {
    return {
      ...state,
      data: null,
      status: 'init',
      error: {
        ...payload.error,
      }
    }
  }),
);
export function LocationReducer(state: LocationState, action: Action) {
  return reducer(state, action);
}