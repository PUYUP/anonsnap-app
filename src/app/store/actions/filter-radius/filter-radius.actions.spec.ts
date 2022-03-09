import * as fromFilterRadius from './filter-radius.actions';

describe('ChangeFilterRadius', () => {
  it('should return an action', () => {
    expect(fromFilterRadius.ChangeFilterRadius().type).toBe('[FilterRadius] Change FilterRadiuss');
  });
});
