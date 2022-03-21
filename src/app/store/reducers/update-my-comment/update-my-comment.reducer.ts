import { Action, createReducer, on } from '@ngrx/store';
import { resetMyCommentStatus, updateMyComment, updateMyCommentFailure, updateMyCommentSuccess } from '../../actions/comment/comment.actions';


export const updateMyCommentFeatureKey = 'updateMyComment';

export interface UpdateMyCommentState {
  data: any;
  error: any;
  status: string;
}

export const initialState: UpdateMyCommentState = {
  data: null,
  error: null,
  status: 'init',
};

export const reducer = createReducer(
  initialState,

  // UPDATE
  on(updateMyComment, (state, payload) => {
    return {
      ...state,
      status: 'loading',
    }
  }),
  on(updateMyCommentSuccess, (state, payload) => {
    return {
      ...state,
      data: {
        ...payload.data
      },
      error: null,
      status: 'loaded',
    }
  }),
  on(updateMyCommentFailure, (state, payload) => {
    return {
      ...state,
      data: null,
      error: {
        ...payload.error,
      },
      status: 'init',
    }
  }),
  on(resetMyCommentStatus, (state, payload) => {
    return {
      ...state,
      status: 'init',
    }
  })
);
export function UpdateMyCommentReducer(state: UpdateMyCommentState, action: Action) {
  return reducer(state, action);
}