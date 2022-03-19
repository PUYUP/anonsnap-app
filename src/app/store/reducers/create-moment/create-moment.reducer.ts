import { Action, createReducer, on } from '@ngrx/store';
import { createMoment, createMomentFailure, createMomentSuccess } from '../../actions/moment/moment.actions';


export const createMomentFeatureKey = 'createMoment';

export interface CreateMomentState {
  data: any,
  error: any,
  status: string;
}

export const initialState: CreateMomentState = {
  data: {},
  error: null,
  status: 'init',
};

export const reducer = createReducer(
  initialState,

  // CREATE
  on(createMoment, (state, payload) => {
    return {
      ...state,
      status: 'loading',
    }
  }),
  on(createMomentSuccess, (state, payload) => {
    return {
      ...state,
      error: null,
      data: {
        ...payload.data,
      },
      status: 'loaded',
    }
  }),
  on(createMomentFailure, (state, payload) => {
    return {
      ...state,
      data: null,
      error: {
        ...payload.error,
      },
      status: 'init',
    }
  })
);
export function CreateMomentReducer(state: CreateMomentState, action: Action) {
  return reducer(state, action);
}