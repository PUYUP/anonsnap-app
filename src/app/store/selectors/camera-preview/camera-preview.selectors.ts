import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../../app.state';

export const takePictureFeature = createFeatureSelector<AppState>('takePicture');
export const SelectTakePicture = createSelector(
	takePictureFeature,
	(state: any) => {
		return state;
  	}
);