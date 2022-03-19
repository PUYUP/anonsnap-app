import { Action, createReducer, on } from '@ngrx/store';
import { deleteMoment, deleteMomentSuccess, resetMomentStatus } from '../../actions/moment/moment.actions';


export const deleteMomentFeatureKey = 'deleteMoment';

export interface DeleteMomentState {
  data: any;
  error: any;
  status: string;
}

export const initialState: DeleteMomentState = {
  data: null,
  error: null,
  status: 'init',
};

export const reducer = createReducer(
  initialState,

  on(deleteMoment, (state, payload) => {
    return {
      ...state,
      status: 'loading',
    }
  }),
  on(deleteMomentSuccess, (state, payload) => {
    return {
      ...state,
      data: {
        ...payload.data,
      },
      status: 'loaded',
    }
  }),
  on(resetMomentStatus, (state, payload) => {
    return {
      ...state,
      status: 'init',
    }
  })
);
export function DeleteMomentReducer(state: DeleteMomentState, action: Action) {
  return reducer(state, action);
}