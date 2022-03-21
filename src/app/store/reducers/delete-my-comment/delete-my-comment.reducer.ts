import { Action, createReducer, on } from '@ngrx/store';
import { deleteMyComment, deleteMyCommentSuccess, resetMyCommentStatus } from '../../actions/comment/comment.actions';


export const deleteMyCommentFeatureKey = 'deleteMyComment';

export interface DeleteMyCommentState {
  data?: any;
  guid: string;
  status: string;
  error?: any;
}

export const initialState: DeleteMyCommentState = {
  guid: null,
  status: 'init',
};

export const reducer = createReducer(
  initialState,

  on(deleteMyComment, (state, payload) => {
    return {
      ...state,
      status: 'loading',
    }
  }),
  on(deleteMyCommentSuccess, (state, payload) => {
    return {
      ...state,
      data: {
        ...payload.data,
      },
      status: 'loaded',
    }
  }),
  on(resetMyCommentStatus, (state, payload) => {
    return {
      ...state,
      status: 'init',
    }
  })
);
export function DeleteMyCommentReducer(state: DeleteMyCommentState, action: Action) {
  return reducer(state, action);
}