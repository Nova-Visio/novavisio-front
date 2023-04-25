import * as fromShared from './shared.actions';

describe('shared', () => {
  it('should return an action', () => {
    expect(fromShared.setNavItems({ navItems: [] } ).type).toBe('[Shared] set nav items');
  });
});
