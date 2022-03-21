import * as fromCameraPreview from './camera-preview.actions';

describe('takeCameraPreviews', () => {
  it('should return an action', () => {
    expect(fromCameraPreview.takeCameraPreviews().type).toBe('[CameraPreview] Take CameraPreviews');
  });
});
