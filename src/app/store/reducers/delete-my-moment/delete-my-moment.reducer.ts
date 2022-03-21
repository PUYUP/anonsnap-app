import { Action, createReducer, on } from '@ngrx/store';
import { deleteMyMoment, deleteMyMomentSuccess, resetMyMomentStatus } from '../../actions/moment/moment.actions';


export const deleteMyMomentFeatureKey = 'deleteMyMoment';

export interface DeleteMyMomentState {
  data: any;
  error: any;
  status: string;
}

export const initialState: DeleteMyMomentState = {
  data: null,
  error: null,
  status: 'init',
};

export const reducer = createReducer(
  initialState,

  on(deleteMyMoment, (state, payload) => {
    return {
      ...state,
      status: 'loading',
    }
  }),
  on(deleteMyMomentSuccess, (state, payload) => {
    return {
      ...state,
      data: {
        ...payload.data,
      },
      status: 'loaded',
    }
  }),
  on(resetMyMomentStatus, (state, payload) => {
    return {
      ...state,
      status: 'init',
    }
  })
);
export function DeleteMyMomentReducer(state: DeleteMyMomentState, action: Action) {
  return reducer(state, action);
}