import { Action, createReducer, on } from '@ngrx/store';
import { clearUserConfirmResetPassword, userConfirmResetPassword, userConfirmResetPasswordFailure, userConfirmResetPasswordSuccess, userRequestResetPassword, userRequestResetPasswordFailure, userRequestResetPasswordSuccess } from '../../actions/user/user.actions';


export const userConfirmResetPasswordFeatureKey = 'userConfirmResetPassword';

export interface UserConfirmResetPasswordState {
  data: any;
  error: any;
  status: string;
}

export const initialState: UserConfirmResetPasswordState = {
  data: null,
  error: null,
  status: 'init',
};

export const reducer = createReducer(
  initialState,

  on(userConfirmResetPassword, (state, payload) => {
    return {
      ...state,
      status: 'loading'
    }
  }),
  on(userConfirmResetPasswordSuccess, (state, payload) => {
    return {
      ...state,
      data: {
        ...payload.data,
      },
      error: null,
      status: 'loaded'
    }
  }),
  on(userConfirmResetPasswordFailure, (state, payload) => {
    return {
      ...state,
      data: null,
      error: {
        ...payload.error
      },
      status: 'init'
    }
  }),
  on(clearUserConfirmResetPassword, (state, payload) => {
    return {
      ...state,
      data: null,
      error: null,
      status: 'init'
    }
  }),
);
export function UserConfirmResetPasswordReducer(state: UserConfirmResetPasswordState, action: Action) {
  return reducer(state, action);
}