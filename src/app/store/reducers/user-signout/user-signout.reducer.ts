import { Action, createReducer, on } from '@ngrx/store';
import { userSignout, userSignoutFailure, userSignoutSuccess } from '../../actions/user/user.actions';


export const userSignoutFeatureKey = 'userSignout';

export interface UserSignoutState {
  status: string;
}

export const initialState: UserSignoutState = {
  status: 'init',
};

export const reducer = createReducer(
  initialState,

  on(userSignout, (state) => {
    return {
      ...state
    }
  }),
  on(userSignoutSuccess, (state) => {
    return {
      ...state,
      status: 'loaded'
    }
  }),
  on(userSignoutFailure, (state, payload) => {
    return {
      ...state,
      error: {
        ...payload.error,
      }
    }
  }),
);
export function UserSignoutReducer(state: UserSignoutState, action: Action) {
  return reducer(state, action);
}