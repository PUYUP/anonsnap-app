import { Action, createReducer, on } from '@ngrx/store';
import { createCommentSuccess } from '../../actions/comment/comment.actions';
import {
  createMomentSuccess,
  deleteMomentSuccess,
  updateMomentSuccess,
  loadMoments,
  loadMomentsFailure,
  loadMomentsSuccess,
  loadMoreMoments,
  refreshMoments
} from '../../actions/moment/moment.actions';


export const loadMomentsFeatureKey = 'loadMoments';

export interface LoadMomentsState {
  data: any;
  filter: any;
  error: any;
  status: string;
}

export const initialState: LoadMomentsState = {
  data: {},
  filter: {},
  error: null,
  status: 'init',
};

export const reducer = createReducer(
  initialState,

  on(loadMoments, (state, payload) => {
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
  on(loadMomentsSuccess, (state, payload) => {
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
  on(loadMomentsFailure, (state, payload) => {
    return {
      ...state,
      error: {
        ...payload.error
      },
      status: 'init',
    }
  }),
  // prepend when created
  on(createMomentSuccess, (state, payload) => {
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
  on(updateMomentSuccess, (state, payload) => {
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
  on(deleteMomentSuccess, (state, payload) => {
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
  on(createCommentSuccess, (state, payload) => {
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
  })
);
export function LoadMomentsReducer(state: LoadMomentsState, action: Action) {
  return reducer(state, action);
}