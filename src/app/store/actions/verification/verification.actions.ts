import { createAction, props } from '@ngrx/store';

export const requestVerifications = createAction(
  '[Verification] Request Verifications'
);

export const requestVerificationsSuccess = createAction(
  '[Verification] Request Verifications Success',
  props<{ data: any }>()
);

export const requestVerificationsFailure = createAction(
  '[Verification] Request Verifications Failure',
  props<{ error: any }>()
);
