import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../../app.state';

export const selectValidateVerificationFeature = createFeatureSelector<AppState>('coreValidateVerification');
export const SelectValidateVerification = createSelector(
	selectValidateVerificationFeature,
	(state: any) => {
		return state;
  	}
);