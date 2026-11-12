import { Selector, t } from 'testcafe';

class LoginPage {
  constructor() {
    this.url = 'https://practicetestautomation.com/practice-test-login/';
    this.username = Selector('#username');
    this.password = Selector('#password');
    this.submit = Selector('#submit');
    // The error banner is always in the DOM; the "show" class makes it visible.
    this.error = Selector('#error');
  }

  async login(username, password) {
    await t
      .typeText(this.username, username, { replace: true, paste: true })
      .typeText(this.password, password, { replace: true, paste: true })
      .click(this.submit);
  }
}

export default new LoginPage();
