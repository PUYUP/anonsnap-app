import { Action, createReducer, on } from '@ngrx/store';
import { clearUserRequestResetPassword, userRequestResetPassword, userRequestResetPasswordFailure, userRequestResetPasswordSuccess } from '../../actions/user/user.actions';


export const userRequestResetPasswordFeatureKey = 'userRequestResetPassword';

export interface UserResetPasswordState {
  data: any;
  error: any;
  status: string;
}

export const initialState: UserResetPasswordState = {
  data: null,
  error: null,
  status: 'init',
};

export const reducer = createReducer(
  initialState,

  on(userRequestResetPassword, (state, payload) => {
    return {
      ...state,
      status: 'loading'
    }
  }),
  on(userRequestResetPasswordSuccess, (state, payload) => {
    return {
      ...state,
      data: {
        ...payload.data,
      },
      error: null,
      status: 'loaded'
    }
  }),
  on(userRequestResetPasswordFailure, (state, payload) => {
    return {
      ...state,
      data: null,
      error: {
        ...payload.error
      },
      status: 'init'
    }
  }),
  on(clearUserRequestResetPassword, (state, payload) => {
    return {
      ...state,
      data: null,
      error: null,
      status: 'init'
    }
  }),
);
export function UserResetPasswordReducer(state: UserResetPasswordState, action: Action) {
  return reducer(state, action);
}