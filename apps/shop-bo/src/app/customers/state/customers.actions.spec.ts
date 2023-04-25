import * as fromCustomers from './customers.actions';

describe('login', () => {
  it('should return an action', () => {
    expect(fromCustomers.getCustomers().type).toBe('[Customers] getCustomers');
  });
});
