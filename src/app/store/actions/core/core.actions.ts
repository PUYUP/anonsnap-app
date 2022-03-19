import { createAction, props } from '@ngrx/store';

// VERIFICATION VALIDATION
export const validateVerification = createAction(
  '[Core] Validate Verification',
  props<{ data: any, passcode: string }>()
);

export const validateVerificationSuccess = createAction(
  '[Core] Validate Verification Success',
  props<{ data: any }>()
);

export const validateVerificationFailure = createAction(
  '[Core] Validate Verification Failure',
  props<{ error: any }>()
);

export const clearValidateVerification = createAction(
  '[Core] Clear Validate Verification'
);