import * as fromFilterRadius from './filter.actions';

describe('FilterRadius', () => {
  it('should return an action', () => {
    expect(fromFilterRadius.FilterRadius().type).toBe('[FilterRadius] Change FilterRadiuss');
  });
});
