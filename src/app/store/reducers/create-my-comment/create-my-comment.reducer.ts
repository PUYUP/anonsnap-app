import { Action, createReducer, on } from '@ngrx/store';
import { createMyComment, createMyCommentFailure, createMyCommentSuccess, resetMyCommentStatus } from '../../actions/comment/comment.actions';


export const createMyCommentFeatureKey = 'createMyComment';

export interface CreateMyCommentState {
  data: any;
  error: any;
  status: string;
}

export const initialState: CreateMyCommentState = {
  data: null,
  error: null,
  status: 'init',
};

export const reducer = createReducer(
  initialState,

  // CREATE
  on(createMyComment, (state, payload) => {
    return {
      ...state,
      status: 'loading',
    }
  }),
  on(createMyCommentSuccess, (state, payload) => {
    return {
      ...state,
      data: {
        ...payload.data
      },
      error: null,
      status: 'loaded',
    }
  }),
  on(createMyCommentFailure, (state, payload) => {
    return {
      ...state,
      data: null,
      error: {
        ...payload.error
      },
      status: 'init',
    }
  }),
  on(resetMyCommentStatus, (state, payload) => {
    return {
      ...state,
      status: 'init',
    }
  }),
);
export function CreateMyCommentReducer(state: CreateMyCommentState, action: Action) {
  return reducer(state, action);
}