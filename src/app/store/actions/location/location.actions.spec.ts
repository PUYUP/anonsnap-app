import * as fromLocation from './location.actions';

describe('saveLocation', () => {
  it('should return an action', () => {
    expect(fromLocation.saveLocation().type).toBe('[Location] Save Location');
  });
});
