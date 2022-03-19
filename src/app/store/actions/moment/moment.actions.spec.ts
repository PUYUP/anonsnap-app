import * as fromMoment from './moment.actions';

describe('createMoments', () => {
  it('should return an action', () => {
    expect(fromMoment.createMoments().type).toBe('[Moment] Create Moments');
  });
});
