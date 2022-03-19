import { Action, createReducer, on } from '@ngrx/store';
import { loadUserSessionSuccess } from '../../actions/user/user.actions';


export const userSessionFeatureKey = 'userSession';

export interface UserSessionState {
  data: any;
}

export const initialState: UserSessionState = {
  data: null,
};

export const reducer = createReducer(
  initialState,

  on(loadUserSessionSuccess, (state, payload) => {
    return {
      ...state,
      data: {
        ...payload.data
      }
    }
  })
);
export function UserSessionReducer(state: UserSessionState, action: Action) {
  return reducer(state, action);
}
