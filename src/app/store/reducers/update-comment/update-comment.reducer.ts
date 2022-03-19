import { Action, createReducer, on } from '@ngrx/store';
import { resetCommentStatus, updateComment, updateCommentFailure, updateCommentSuccess } from '../../actions/comment/comment.actions';


export const updateCommentFeatureKey = 'updateComment';

export interface UpdateCommentState {
  data: any;
  error: any;
  status: string;
}

export const initialState: UpdateCommentState = {
  data: null,
  error: null,
  status: 'init',
};

export const reducer = createReducer(
  initialState,

  // UPDATE
  on(updateComment, (state, payload) => {
    return {
      ...state,
      status: 'loading',
    }
  }),
  on(updateCommentSuccess, (state, payload) => {
    return {
      ...state,
      data: {
        ...payload.data
      },
      error: null,
      status: 'loaded',
    }
  }),
  on(updateCommentFailure, (state, payload) => {
    return {
      ...state,
      data: null,
      error: {
        ...payload.error,
      },
      status: 'init',
    }
  }),
  on(resetCommentStatus, (state, payload) => {
    return {
      ...state,
      status: 'init',
    }
  })
);
export function UpdateCommentReducer(state: UpdateCommentState, action: Action) {
  return reducer(state, action);
}