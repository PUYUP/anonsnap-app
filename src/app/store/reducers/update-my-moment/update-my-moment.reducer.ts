import { Action, createReducer, on } from '@ngrx/store';
import { resetMomentStatus, resetMyMomentStatus, updateMyMoment, updateMyMomentFailure, updateMyMomentSuccess } from '../../actions/moment/moment.actions';


export const updateMyMomentFeatureKey = 'updateMyMoment';

export interface UpdateMyMomentState {
  data: any,
  error: any,
  status: string;
}

export const initialState: UpdateMyMomentState = {
  data: {},
  error: null,
  status: 'init',
};

export const reducer = createReducer(
  initialState,

  // UPDATE
  on(updateMyMoment, (state, payload) => {
    return {
      ...state,
      status: 'loading',
    }
  }),
  on(updateMyMomentSuccess, (state, payload) => {
    return {
      ...state,
      data: {
        ...payload.data
      },
      error: null,
      status: 'loaded',
    }
  }),
  on(updateMyMomentFailure, (state, payload) => {
    return {
      ...state,
      data: null,
      error: {
        ...payload.error,
      },
      status: 'init',
    }
  }),
  on(resetMyMomentStatus, (state, payload) => {
    return {
      ...state,
      status: 'init',
    }
  })
);
export function UpdateMyMomentReducer(state: UpdateMyMomentState, action: Action) {
  return reducer(state, action);
}