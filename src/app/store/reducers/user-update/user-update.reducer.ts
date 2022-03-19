import { Action, createReducer, on } from '@ngrx/store';
import { userUpdate, userUpdateFailure, userUpdateSuccess } from '../../actions/user/user.actions';


export const userUpdateFeatureKey = 'userUpdate';

export interface UserUpdateState {
  data: any;
  error: any;
  status: string;
}

export const initialState: UserUpdateState = {
  data: null,
  error: null,
  status: 'init',
};

export const reducer = createReducer(
  initialState,

  on(userUpdate, (state, payload) => {
    return {
      ...state,
      status: 'loading',
    }
  }),
  on(userUpdateSuccess, (state, payload) => {
    return {
      ...state,
      data: {
        ...payload.data
      },
      error: null,
      status: 'loading'
    }
  }),
  on(userUpdateFailure, (state, payload) => {
    return {
      ...state,
      data: null,
      error: {
        ...payload.error,
      },
      status: 'init',
    }
  })
);
export function UserUpdateReducer(state: UserUpdateState, action: Action) {
  return reducer(state, action);
}