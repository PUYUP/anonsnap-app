import { createAction, props } from '@ngrx/store';

export const takePicture = createAction(
  '[CameraPreview] Take Picture',
  props<{ data: any }>()
);

export const takePictureSuccess = createAction(
  '[CameraPreview] Take Picture Success',
  props<{ data: any }>()
);

export const takePictureFailure = createAction(
  '[CameraPreview] Take Picture Failure',
  props<{ error: any }>()
);

export const resetTakePicture = createAction(
  '[CameraPreview] Reset Take Picture'
);
