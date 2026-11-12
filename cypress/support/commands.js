/**
 * Logs in to Sauce Demo once per user and caches the session (cookies + storage),
 * so tests that are not about login skip the UI form and start in a clean state.
 */
Cypress.Commands.add('loginAs', (userKey = 'standard') => {
  cy.fixture('users').then((users) => {
    const { username, password } = users[userKey];

    cy.session(
      ['saucedemo', username],
      () => {
        cy.visit('/');
        cy.get('[data-test="username"]').type(username);
        cy.get('[data-test="password"]').type(password, { log: false });
        cy.get('[data-test="login-button"]').click();
        cy.location('pathname').should('eq', '/inventory.html');
      },
      { cacheAcrossSpecs: true },
    );
  });
});

/** Reads a list of "$12.34" strings from the page and returns them as numbers. */
Cypress.Commands.add('pricesFrom', { prevSubject: true }, (subject) =>
  Cypress._.map(subject, (el) => Number(el.innerText.replace(/[^0-9.]/g, ''))),
);
