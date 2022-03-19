import { Action, createReducer, on } from '@ngrx/store';
import { createComment, createCommentFailure, createCommentSuccess, resetCommentStatus } from '../../actions/comment/comment.actions';


export const createCommentFeatureKey = 'createComment';

export interface CreateCommentState {
  data: any;
  error: any;
  status: string;
}

export const initialState: CreateCommentState = {
  data: null,
  error: null,
  status: 'init',
};

export const reducer = createReducer(
  initialState,

  // CREATE
  on(createComment, (state, payload) => {
    return {
      ...state,
      status: 'loading',
    }
  }),
  on(createCommentSuccess, (state, payload) => {
    return {
      ...state,
      data: {
        ...payload.data
      },
      error: null,
      status: 'loaded',
    }
  }),
  on(createCommentFailure, (state, payload) => {
    return {
      ...state,
      data: null,
      error: {
        ...payload.error
      },
      status: 'init',
    }
  }),
  on(resetCommentStatus, (state, payload) => {
    return {
      ...state,
      status: 'init',
    }
  }),
);
export function CreateCommentReducer(state: CreateCommentState, action: Action) {
  return reducer(state, action);
}