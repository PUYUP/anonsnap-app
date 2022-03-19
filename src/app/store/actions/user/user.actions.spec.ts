import * as fromUserSignin from './user.actions';

describe('signinUserSignins', () => {
  it('should return an action', () => {
    expect(fromUserSignin.signinUserSignins().type).toBe('[UserSignin] Signin UserSignins');
  });
});
