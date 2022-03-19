import { Action, createReducer, on } from '@ngrx/store';
import { clearValidateVerification, validateVerification, validateVerificationFailure, validateVerificationSuccess } from '../../actions/core/core.actions';


export const coreValidateVerificationFeatureKey = 'coreValidateVerification';

export interface ValidateVerificationState {
  data: any;
  error: any;
  status: string;
}

export const initialState: ValidateVerificationState = {
  data: null,
  error: null,
  status: 'init',
};

export const reducer = createReducer(
  initialState,

  on(validateVerification, (state, payload) => {
    return {
      ...state,
      status: 'loading'
    }
  }),
  on(validateVerificationSuccess, (state, payload) => {
    return {
      ...state,
      error: null,
      data: {
        ...payload.data
      },
      status: 'loaded'
    }
  }),
  on(validateVerificationFailure, (state, payload) => {
    return {
      ...state,
      data: null,
      error: {
        ...payload.error
      },
      status: 'init'
    }
  }),
  on(clearValidateVerification, (state, payload) => {
    return {
      ...state,
      error: null,
      data: null,
      status: 'init'
    }
  }),
);
export function ValidateVerificationReducer(state: ValidateVerificationState, action: Action) {
  return reducer(state, action);
}