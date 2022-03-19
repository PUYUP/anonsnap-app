import * as fromComment from './comment.actions';

describe('createComments', () => {
  it('should return an action', () => {
    expect(fromComment.createComments().type).toBe('[Comment] Create Comments');
  });
});
