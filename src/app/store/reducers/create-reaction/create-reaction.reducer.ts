import { Action, createReducer, on } from '@ngrx/store';
import { createReaction, createReactionSuccess } from '../../actions/reaction/reaction.actions';


export const createReactionFeatureKey = 'createReaction';

export interface CreateReactionState {
  data: any;
  error: any;
  status: string;
}

export const initialState: CreateReactionState = {
  data: null,
  error: null,
  status: 'init',
};

export const reducer = createReducer(
  initialState,

  on(createReaction, (state, payload) => {
    return {
      ...state,
      status: 'loading',
    }
  }),
  on(createReactionSuccess, (state, payload) => {
    return {
      ...state,
      data: {
        ...payload.data,
      },
      error: null,
      status: 'loaded',
    }
  })
);
export function CreateReactionReducer(state: CreateReactionState, action: Action) {
  return reducer(state, action);
}