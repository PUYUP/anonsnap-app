import { Action, createReducer, on } from '@ngrx/store';
import { createCommentSuccess, deleteCommentSuccess, loadComments, loadCommentsSuccess, updateCommentSuccess } from '../../actions/comment/comment.actions';


export const commentListFeatureKey = 'commentList';

export interface CommentListState {
  data: any;
  filter: any;
  error: any;
  status: string;
}

export const initialState: CommentListState = {
  data: null,
  filter: {},
  error: null,
  status: 'init',
};

export const reducer = createReducer(
  initialState,

  on(loadComments, (state, payload) => {
    let filter = {
      ...state.filter,
      ...payload?.filter
    }

    return {
      ...state,
      filter: filter,
      data: {},
      status: 'loading',
    }
  }),
  on(loadCommentsSuccess, (state, payload) => {
    let results = payload?.data?.results;
    let currentResults = state?.data?.results ? state?.data?.results : [];

    return {
      ...state,
      data: {
        ...payload.data,
        results: [...currentResults, ...results]
      },
      error: null,
      status: 'loaded',
    }
  }),
  // prepend when created
  on(createCommentSuccess, (state, payload) => {
    return {
      ...state,
      data: {
        ...state.data,
        results: [payload.data, ...state?.data?.results]
      },
      error: null,
    }
  }),
  // update when edit
  on(updateCommentSuccess, (state, payload) => {
    let results = state?.data?.results;
    
    // replace with new item
    let newResults = results.map((d: any) => {
      if (d.guid == payload.data.guid) {
        d = {
          ...payload.data
        }
      }
      return d;
    });

    return {
      ...state,
      data: {
        ...state.data,
        results: [...newResults],
      },
      error: null,
    }
  }),
  // when delte
  on(deleteCommentSuccess, (state, payload) => {
    let results = state?.data?.results;
    let newResults = results.filter((d: any) => d.guid != payload?.data?.guid);
    
    return {
      ...state,
      data: {
        ...state?.data,
        results: newResults
      },
    }
  })
);

export function CommentListReducer(state: CommentListState, action: Action) {
  return reducer(state, action);
}
