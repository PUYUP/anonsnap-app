import { Action, createReducer, on } from '@ngrx/store';
import { deleteComment, deleteCommentSuccess, resetCommentStatus } from '../../actions/comment/comment.actions';


export const deleteCommentFeatureKey = 'deleteComment';

export interface DeleteCommentState {
  data?: any;
  guid: string;
  status: string;
  error?: any;
}

export const initialState: DeleteCommentState = {
  guid: null,
  status: 'init',
};

export const reducer = createReducer(
  initialState,

  on(deleteComment, (state, payload) => {
    return {
      ...state,
      status: 'loading',
    }
  }),
  on(deleteCommentSuccess, (state, payload) => {
    return {
      ...state,
      data: {
        ...payload.data,
      },
      status: 'loaded',
    }
  }),
  on(resetCommentStatus, (state, payload) => {
    return {
      ...state,
      status: 'init',
    }
  })
);
export function DeleteCommentReducer(state: DeleteCommentState, action: Action) {
  return reducer(state, action);
}