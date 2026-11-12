class LoginPage {
  elements = {
    username: () => cy.get('[data-test="username"]'),
    password: () => cy.get('[data-test="password"]'),
    submit: () => cy.get('[data-test="login-button"]'),
    error: () => cy.get('[data-test="error"]'),
    dismissError: () => cy.get('[data-test="error-button"]'),
  };

  visit() {
    cy.visit('/');
  }

  login(username, password) {
    if (username) this.elements.username().type(username);
    if (password) this.elements.password().type(password, { log: false });
    this.elements.submit().click();
  }

  shouldShowError(message) {
    this.elements.error().should('be.visible').and('contain.text', message);
  }
}

export default new LoginPage();
