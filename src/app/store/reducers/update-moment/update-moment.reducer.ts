import { Action, createReducer, on } from '@ngrx/store';
import { resetMomentStatus, updateMoment, updateMomentFailure, updateMomentSuccess } from '../../actions/moment/moment.actions';


export const updateMomentFeatureKey = 'updateMoment';

export interface UpdateMomentState {
  data: any,
  error: any,
  status: string;
}

export const initialState: UpdateMomentState = {
  data: {},
  error: null,
  status: 'init',
};

export const reducer = createReducer(
  initialState,

  // UPDATE
  on(updateMoment, (state, payload) => {
    return {
      ...state,
      status: 'loading',
    }
  }),
  on(updateMomentSuccess, (state, payload) => {
    return {
      ...state,
      data: {
        ...payload.data
      },
      error: null,
      status: 'loaded',
    }
  }),
  on(updateMomentFailure, (state, payload) => {
    return {
      ...state,
      data: null,
      error: {
        ...payload.error,
      },
      status: 'init',
    }
  }),
  on(resetMomentStatus, (state, payload) => {
    return {
      ...state,
      status: 'init',
    }
  })
);
export function UpdateMomentReducer(state: UpdateMomentState, action: Action) {
  return reducer(state, action);
}