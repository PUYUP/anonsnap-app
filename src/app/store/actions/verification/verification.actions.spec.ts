import * as fromVerification from './verification.actions';

describe('requestVerifications', () => {
  it('should return an action', () => {
    expect(fromVerification.requestVerifications().type).toBe('[Verification] Request Verifications');
  });
});
