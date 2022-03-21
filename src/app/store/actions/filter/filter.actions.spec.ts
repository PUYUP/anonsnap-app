import * as fromFilterMap from './filter.actions';

describe('FilterMap', () => {
  it('should return an action', () => {
    expect(fromFilterMap.FilterMap().type).toBe('[FilterMap] Change FilterMaps');
  });
});
