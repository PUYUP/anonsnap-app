import * as fromReaction from './reaction.actions';

describe('createReactions', () => {
  it('should return an action', () => {
    expect(fromReaction.createReactions().type).toBe('[Reaction] Create Reactions');
  });
});
