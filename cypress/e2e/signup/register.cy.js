import signupPage from '../../pages/SignupPage';
import { buildUser } from '../../support/factories';
import { AUTOMATION_EXERCISE_URL } from '../../support/urls';

// The demo site ships third-party scripts that throw errors unrelated to the flows under test.
Cypress.on('uncaught:exception', () => false);

const apiUrl = (path) => `${AUTOMATION_EXERCISE_URL}/api/${path}`;

/** The demo API answers JSON with a text/html content type, so parse it defensively. */
const parse = (body) => (typeof body === 'string' ? JSON.parse(body) : body);

/** Seeds an account through the public API — much faster than the UI and keeps tests independent. */
const createAccountViaApi = (user) =>
  cy
    .request({
      method: 'POST',
      url: apiUrl('createAccount'),
      form: true,
      body: {
        name: user.name,
        email: user.email,
        password: user.password,
        title: user.title,
        birth_date: user.birth.day,
        birth_month: user.birth.month,
        birth_year: user.birth.year,
        firstname: user.firstName,
        lastname: user.lastName,
        company: user.company,
        address1: user.address,
        address2: user.address2,
        country: user.country,
        zipcode: user.zipcode,
        state: user.state,
        city: user.city,
        mobile_number: user.mobile,
      },
    })
    .then(({ body }) => expect(parse(body).responseCode).to.eq(201));

const deleteAccountViaApi = (user) =>
  cy.request({
    method: 'DELETE',
    url: apiUrl('deleteAccount'),
    form: true,
    body: { email: user.email, password: user.password },
  });

describe('Sign up · Automation Exercise', () => {
  beforeEach(() => {
    signupPage.visit();
  });

  it('registers a new account, logs in automatically and deletes it', () => {
    const user = buildUser();

    signupPage.startSignup(user.name, user.email);
    cy.location('pathname').should('eq', '/signup');
    signupPage.fillAccountDetails(user);

    signupPage.elements.accountCreated().invoke('text').should('match', /account created!/i);
    signupPage.elements.continueButton().click();
    signupPage.elements.loggedInAs().should('contain.text', user.name);

    signupPage.deleteAccount();
  });

  it('rejects sign-up with an e-mail that is already registered', () => {
    const user = buildUser();
    createAccountViaApi(user);

    signupPage.startSignup('Another Name', user.email);

    cy.contains('Email Address already exist!').should('be.visible');
    deleteAccountViaApi(user);
  });

  it('logs in with an account created through the API', () => {
    const user = buildUser();
    createAccountViaApi(user);

    signupPage.login(user.email, user.password);

    signupPage.elements.loggedInAs().should('contain.text', user.name);
    signupPage.deleteAccount();
  });

  it('rejects login with an unknown e-mail', () => {
    const user = buildUser();

    signupPage.login(user.email, user.password);

    cy.contains('Your email or password is incorrect!').should('be.visible');
  });
});
