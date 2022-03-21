import { Action, createReducer, on } from '@ngrx/store';
import { createMyCommentSuccess, deleteMyCommentSuccess } from '../../actions/comment/comment.actions';
import {
  loadMyMoments,
  loadMyMomentsFailure,
  loadMyMomentsSuccess,
  loadMoreMoments,
  refreshMoments,
  updateMyMomentSuccess,
  deleteMyMomentSuccess
} from '../../actions/moment/moment.actions';


export const loadMyMomentsFeatureKey = 'loadMyMoments';

export interface LoadMyMomentsState {
  data: any;
  filter: any;
  error: any;
  status: string;
}

export const initialState: LoadMyMomentsState = {
  data: {},
  filter: {},
  error: null,
  status: 'init',
};

export const reducer = createReducer(
  initialState,

  on(loadMyMoments, (state, payload) => {
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
  on(refreshMoments, (state, payload) => {
    return {
      ...state
    }
  }),
  on(loadMoreMoments, (state, payload) => {
    return {
      ...state,
    }
  }),
  on(loadMyMomentsSuccess, (state, payload) => {
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
  on(loadMyMomentsFailure, (state, payload) => {
    return {
      ...state,
      error: {
        ...payload.error
      },
      status: 'init',
    }
  }),
  // update when edit
  on(updateMyMomentSuccess, (state, payload) => {
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
  // remove when delete
  on(deleteMyMomentSuccess, (state, payload) => {
    let results = state?.data?.results;
    let newResults = results.filter((d: any) => d.guid != payload?.data?.guid);
    
    return {
      ...state,
      data: {
        ...state?.data,
        results: newResults
      },
    }
  }),
  // update comment count when comment created
  on(createMyCommentSuccess, (state, payload) => {
    let results = state?.data?.results;
    let newResults = results.map((d: any) => {
      if (d.guid == payload?.data?.object_guid) {
        d = {
          ...d,
          comment_count: d.comment_count + 1
        }
      }

      return d
    });

    return {
      ...state,
      data: {
        ...state.data,
        results: [...newResults]
      }
    }
  }),
  // update comment count when comment deleted
  on(deleteMyCommentSuccess, (state, payload) => {
    let results = state?.data?.results;
    let newResults = results.map((d: any) => {
      if (d.guid == payload?.data?.object_guid) {
        d = {
          ...d,
          comment_count: d.comment_count - 1
        }
      }

      return d
    });

    return {
      ...state,
      data: {
        ...state.data,
        results: [...newResults]
      }
    }
  })
);
export function LoadMyMomentsReducer(state: LoadMyMomentsState, action: Action) {
  return reducer(state, action);
}