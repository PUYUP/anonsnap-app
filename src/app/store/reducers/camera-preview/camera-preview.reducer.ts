import { Action, createReducer, on } from '@ngrx/store';
import { resetTakePicture, takePicture } from '../../actions/camera-preview/camera-preview.actions';


export const cameraPreviewFeatureKey = 'takePicture';

export interface TakePictureState {
  data: any;
}

export const initialState: TakePictureState = {
  data: null,
};

export const reducer = createReducer(
  initialState,

  on(takePicture, (state, payload) => {
    return {
      ...state,
      data: {
        ...payload.data
      }
    }
  }),
  on(resetTakePicture, (state, payload) => {
    return {
      ...state,
      data: null,
    }
  })
);
export function TakePictureReducer(state: TakePictureState, action: Action) {
  return reducer(state, action);
}