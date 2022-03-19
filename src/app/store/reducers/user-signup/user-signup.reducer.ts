import { Action, createReducer, on } from '@ngrx/store';
import { userSignup, userSignupFailure, userSignupSuccess } from '../../actions/user/user.actions';


export const userSignupFeatureKey = 'userSignup';

export interface UserSignupState {
  data: any;
  error: any;
  status: string;
}

export const initialState: UserSignupState = {
  data: {},
  error: null,
  status: 'init',
};

export const reducer = createReducer(
  initialState,

  on(userSignup, (state, payload) => {
    return {
      ...state,
      status: 'loading',
    }
  }),
  on(userSignupSuccess, (state, payload) => {
    return {
      ...state,
      data: {
        ...payload.data
      },
      error: null,
      status: 'loaded',
    }
  }),
  on(userSignupFailure, (state, payload) => {
    return {
      ...state,
      data: null,
      error: {
        ...payload.error?.error
      },
      status: 'init',
    }
  })
);
export function UserSignupReducer(state: UserSignupState, action: Action) {
  return reducer(state, action);
}