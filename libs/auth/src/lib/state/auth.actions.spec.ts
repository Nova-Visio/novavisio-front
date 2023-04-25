import * as fromAuth from './auth.actions';

describe('login', () => {
  it('should return an action', () => {
    expect(fromAuth.login().type).toBe('[Auth] Login');
  });
});
