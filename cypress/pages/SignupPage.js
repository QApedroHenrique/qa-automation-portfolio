import { AUTOMATION_EXERCISE_URL } from '../support/urls';

/** Page object for the Automation Exercise sign-up / login flow. */
class SignupPage {
  elements = {
    signupName: () => cy.get('[data-qa="signup-name"]'),
    signupEmail: () => cy.get('[data-qa="signup-email"]'),
    signupButton: () => cy.get('[data-qa="signup-button"]'),
    loginEmail: () => cy.get('[data-qa="login-email"]'),
    loginPassword: () => cy.get('[data-qa="login-password"]'),
    loginButton: () => cy.get('[data-qa="login-button"]'),
    accountCreated: () => cy.get('[data-qa="account-created"]'),
    accountDeleted: () => cy.get('[data-qa="account-deleted"]'),
    continueButton: () => cy.get('[data-qa="continue-button"]'),
    loggedInAs: () => cy.contains('a', 'Logged in as'),
    deleteAccountLink: () => cy.get('a[href="/delete_account"]'),
  };

  visit() {
    cy.visit(`${AUTOMATION_EXERCISE_URL}/login`);
  }

  startSignup(name, email) {
    this.elements.signupName().type(name);
    this.elements.signupEmail().type(email);
    this.elements.signupButton().click();
  }

  fillAccountDetails(user) {
    cy.get(user.title === 'Mr' ? '#id_gender1' : '#id_gender2').check();
    cy.get('[data-qa="password"]').type(user.password, { log: false });
    cy.get('[data-qa="days"]').select(user.birth.day);
    cy.get('[data-qa="months"]').select(user.birth.month);
    cy.get('[data-qa="years"]').select(user.birth.year);
    cy.get('[data-qa="first_name"]').type(user.firstName);
    cy.get('[data-qa="last_name"]').type(user.lastName);
    cy.get('[data-qa="company"]').type(user.company);
    cy.get('[data-qa="address"]').type(user.address);
    cy.get('[data-qa="address2"]').type(user.address2);
    cy.get('[data-qa="country"]').select(user.country);
    cy.get('[data-qa="state"]').type(user.state);
    cy.get('[data-qa="city"]').type(user.city);
    cy.get('[data-qa="zipcode"]').type(user.zipcode);
    cy.get('[data-qa="mobile_number"]').type(user.mobile);
    cy.get('[data-qa="create-account"]').click();
  }

  login(email, password) {
    this.elements.loginEmail().type(email);
    this.elements.loginPassword().type(password, { log: false });
    this.elements.loginButton().click();
  }

  deleteAccount() {
    this.elements.deleteAccountLink().click();
    this.elements.accountDeleted().invoke('text').should('match', /account deleted!/i);
  }
}

export default new SignupPage();
