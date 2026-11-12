/**
 * Test data builders. Every call returns unique data, so tests never depend
 * on accounts left behind by previous runs.
 */
export function buildUser(overrides = {}) {
  const id = `${Date.now()}${Cypress._.random(100, 999)}`;

  return {
    name: `QA User ${id}`,
    email: `qa.user.${id}@example.com`,
    password: `Pw!${id}`,
    title: 'Mrs',
    birth: { day: '15', month: '6', year: '1995' },
    firstName: 'Ana',
    lastName: 'Tester',
    company: 'QA Labs',
    address: '123 Test Street',
    address2: 'Suite 4',
    country: 'Canada',
    state: 'Ontario',
    city: 'Toronto',
    zipcode: 'M5V 2T6',
    mobile: '4165550100',
    ...overrides,
  };
}
