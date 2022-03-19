import { Action, createReducer, on } from '@ngrx/store';
import { userSignin, userSigninFailure, userSigninSuccess } from '../../actions/user/user.actions';


export const userSigninFeatureKey = 'userSignin';

export interface UserSigninState {
  data: any;
  error: any;
  status: string;
}

export const initialState: UserSigninState = {
  data: {},
  error: null,
  status: 'init',
};

export const reducer = createReducer(
  initialState,

  on(userSignin, (state, payload) => {
    return {
      ...state,
      status: 'loading',
    }
  }),
  on(userSigninSuccess, (state, payload) => {
    return {
      ...state,
      data: {
        ...payload.data
      },
      error: null,
      status: 'loaded',
    }
  }),
  on(userSigninFailure, (state, payload) => {
    return {
      ...state,
      data: null,
      error: {
        ...payload.error?.error
      },
      status: 'init',
    }
  }),
);
export function UserSigninReducer(state: UserSigninState, action: Action) {
  return reducer(state, action);
}