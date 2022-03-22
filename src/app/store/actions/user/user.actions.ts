import { createAction, props } from '@ngrx/store';

// ...
// SIGNUP
// ...
export const userSignup = createAction(
  '[User] Signup',
  props<{ username: string; password: string; retype_password: string }>()
);

export const userSignupSuccess = createAction(
  '[User] Signup Success',
  props<{ data: any }>()
);

export const userSignupFailure = createAction(
  '[User] Signup Failure',
  props<{ error: any }>()
);


// ...
// SIGNIN
// ...
export const userSignin = createAction(
  '[User] Signin',
  props<{ username: string; password: string }>()
);

export const userSigninSuccess = createAction(
  '[User] Signin Success',
  props<{ data: any }>()
);

export const userSigninFailure = createAction(
  '[User] Signin Failure',
  props<{ error: any }>()
);


// ...
// SIGNOUT
// ...
export const userSignout = createAction(
  '[User] Signout'
);

export const userSignoutSuccess = createAction(
  '[User] Signout Success'
);

export const userSignoutFailure = createAction(
  '[User] Signout Failure',
  props<{ error: any }>()
);


// ...
// SESSION
// ...
export const loadUserSession = createAction(
  '[User] Load Session'
);

export const loadUserSessionSuccess = createAction(
  '[User] Load Session Success',
  props<{ data: any }>()
);

export const loadUserSessionFailure = createAction(
  '[User] Load Session Failure',
  props<{ error: any }>()
);


// ...
// UPDATE
// ...
export const userUpdate = createAction(
  '[User] Update',
  props<{ data: any }>()
);

export const userUpdateSuccess = createAction(
  '[User] Update Success',
  props<{ data: any }>()
);

export const userUpdateFailure = createAction(
  '[User] Update Failure',
  props<{ error: any }>()
);


// ...
// CHANGE PASSWORD
// ...
export const userChangePassword = createAction(
  '[User] Change Password',
  props<{ data: any }>()
);

export const userChangePasswordSuccess = createAction(
  '[User] Change Password Success',
  props<{ data: any }>()
);

export const userChangePasswordFailure = createAction(
  '[User] Change Password Failure',
  props<{ error: any }>()
);


// ...
// RESET PASSWORD
// ...
export const userRequestResetPassword = createAction(
  '[User] Request Reset Password',
  props<{ data: any }>()
);

export const userRequestResetPasswordSuccess = createAction(
  '[User] Request Reset Password Success',
  props<{ data: any }>()
);

export const userRequestResetPasswordFailure = createAction(
  '[User] Request Reset Password Failure',
  props<{ error: any }>()
);

export const clearUserRequestResetPassword = createAction(
  '[User] Clear Request Reset Password'
);


// ...
// RESET PASSWORD CONFIRM
// ...
export const userConfirmResetPassword = createAction(
  '[User] Confirm Reset Password',
  props<{ data: any }>()
);

export const userConfirmResetPasswordSuccess = createAction(
  '[User] Confirm Reset Password Success',
  props<{ data: any }>()
);

export const userConfirmResetPasswordFailure = createAction(
  '[User] Confirm Reset Password Failure',
  props<{ error: any }>()
);

export const clearUserConfirmResetPassword = createAction(
  '[User] Clear Confirm Reset Password'
);
