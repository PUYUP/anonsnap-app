import { Action, createReducer, on } from '@ngrx/store';
import { deleteMyCommentSuccess, loadMyComments, loadMyCommentsSuccess, updateMyCommentSuccess } from '../../actions/comment/comment.actions';


export const listMyCommentFeatureKey = 'listMyComment';

export interface ListMyCommentState {
  data: any;
  filter: any;
  error: any;
  status: string;
}

export const initialState: ListMyCommentState = {
  data: null,
  filter: {},
  error: null,
  status: 'init',
};

export const reducer = createReducer(
  initialState,

  on(loadMyComments, (state, payload) => {
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
  on(loadMyCommentsSuccess, (state, payload) => {
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
  // update when edit
  on(updateMyCommentSuccess, (state, payload) => {
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
  on(deleteMyCommentSuccess, (state, payload) => {
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

export function ListMyCommentReducer(state: ListMyCommentState, action: Action) {
  return reducer(state, action);
}
