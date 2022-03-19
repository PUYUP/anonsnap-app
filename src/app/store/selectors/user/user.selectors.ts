import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../../app.state';

export const selectSigninFeature = createFeatureSelector<AppState>('userSignin');
export const SelectUserSignin = createSelector(
	selectSigninFeature,
	(state: any) => {
		return state;
  	}
);

export const selectSignupFeature = createFeatureSelector<AppState>('userSignup');
export const SelectUserSignup = createSelector(
	selectSignupFeature,
	(state: any) => {
		return state;
  	}
);

export const selectUserSessionFeature = createFeatureSelector<AppState>('userSession');
export const SelectUserSession = createSelector(
	selectUserSessionFeature,
	(state: any) => {
		return state;
  	}
);

export const selectUserChangePasswordFeature = createFeatureSelector<AppState>('userChangePassword');
export const SelectUserChangePassword = createSelector(
	selectUserChangePasswordFeature,
	(state: any) => {
		return state;
  	}
);

export const selectUserResetPasswordFeature = createFeatureSelector<AppState>('userRequestResetPassword');
export const SelectUserResetPassword = createSelector(
	selectUserResetPasswordFeature,
	(state: any) => {
		return state;
  	}
);

export const selectUserResetPasswordConfirmFeature = createFeatureSelector<AppState>('userRequestResetPasswordConfirm');
export const SelectUserResetConfirmPassword = createSelector(
	selectUserResetPasswordConfirmFeature,
	(state: any) => {
		return state;
  	}
);