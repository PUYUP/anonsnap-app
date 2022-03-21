import { Action, createReducer, on } from '@ngrx/store';
import { loadTags, loadTagsFailure, loadTagsSuccess } from '../../actions/tag/tag.actions';


export const loadTagFeatureKey = 'loadTag';

export interface LoadTagsState {
  data?: any;
  filter?: any;
  error: any;
  status: string;
}

export const initialState: LoadTagsState = {
  data: null,
  filter: {},
  error: null,
  status: 'init',
};

export const reducer = createReducer(
  initialState,

  on(loadTags, (state, payload) => {
    return {
      ...state.data,
      status: 'loading',
    }
  }),
  on(loadTagsSuccess, (state, payload) => {
    return {
      ...state.data,
      data: {
        ...state.data,
        ...payload.data,
      },
      error: null,
      status: 'loaded',
    }
  }),
  on(loadTagsFailure, (state, payload) => {
    return {
      ...state.data,
      data: null,
      error: {
        ...payload.error
      },
      status: 'init',
    }
  })
);
export function LoadTagsReducer(state: LoadTagsState, action: Action) {
  return reducer(state, action);
}