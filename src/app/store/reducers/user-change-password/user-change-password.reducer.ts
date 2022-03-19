import { Action, createReducer, on } from '@ngrx/store';
import { userChangePassword, userChangePasswordFailure, userChangePasswordSuccess } from '../../actions/user/user.actions';


export const userChangePasswordFeatureKey = 'userChangePassword';

export interface UserChangePasswordState {
  status: string;
  data: any;
}

export const initialState: UserChangePasswordState = {
  status: 'init',
  data: null
};

export const reducer = createReducer(
  initialState,

  on(userChangePassword, (state, payload) => {
    return {
      ...state,
      status: 'loading'
    }
  }),
  on(userChangePasswordSuccess, (state, payload) => {
    return {
      ...state,
      data: {
        ...payload.data
      },
      error: null,
      status: 'loaded',
    }
  }),
  on(userChangePasswordFailure, (state, payload) => {
    return {
      ...state,
      data: null,
      error: {
        ...payload.error
      },
      status: 'init',
    }
  })
);
export function UserChangePasswordReducer(state: UserChangePasswordState, action: Action) {
  return reducer(state, action);
}