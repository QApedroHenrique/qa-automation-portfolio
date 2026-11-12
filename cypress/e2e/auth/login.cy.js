import loginPage from '../../pages/LoginPage';
import inventoryPage from '../../pages/InventoryPage';

describe('Authentication · Sauce Demo', () => {
  let users;

  before(() => {
    cy.fixture('users').then((data) => {
      users = data;
    });
  });

  beforeEach(() => {
    loginPage.visit();
  });

  it('logs in with a valid user and lands on the product list', () => {
    loginPage.login(users.standard.username, users.standard.password);

    cy.location('pathname').should('eq', '/inventory.html');
    inventoryPage.elements.title().should('have.text', 'Products');
  });

  const invalidAttempts = [
    { scenario: 'both fields are empty', username: '', password: '', error: 'Username is required' },
    { scenario: 'the password is missing', username: 'standard_user', password: '', error: 'Password is required' },
    {
      scenario: 'the password is wrong',
      username: 'standard_user',
      password: 'wrong_password',
      error: 'Username and password do not match any user in this service',
    },
  ];

  invalidAttempts.forEach(({ scenario, username, password, error }) => {
    it(`shows a validation error when ${scenario}`, () => {
      loginPage.login(username, password);

      loginPage.shouldShowError(error);
      cy.location('pathname').should('eq', '/');
    });
  });

  it('blocks a locked-out user', () => {
    loginPage.login(users.lockedOut.username, users.lockedOut.password);

    loginPage.shouldShowError('Sorry, this user has been locked out.');
    cy.location('pathname').should('eq', '/');
  });

  it('lets the user dismiss the error message', () => {
    loginPage.login('', '');
    loginPage.elements.dismissError().click();

    loginPage.elements.error().should('not.exist');
  });

  it('does not allow opening a protected page without logging in', () => {
    inventoryPage.visit();

    cy.location('pathname').should('eq', '/');
    loginPage.shouldShowError("You can only access '/inventory.html' when you are logged in.");
  });

  it('ends the session on logout', () => {
    loginPage.login(users.standard.username, users.standard.password);
    inventoryPage.logout();

    cy.location('pathname').should('eq', '/');
    inventoryPage.visit();
    loginPage.shouldShowError('when you are logged in');
  });
});
