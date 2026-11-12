import { Selector, t } from 'testcafe';

class LoginPage {
  constructor() {
    this.url = 'https://the-internet.herokuapp.com/login';
    this.username = Selector('#username');
    this.password = Selector('#password');
    this.submit = Selector('#login button[type="submit"]');
    this.flash = Selector('#flash');
  }

  async login(username, password) {
    await t
      .typeText(this.username, username, { replace: true, paste: true })
      .typeText(this.password, password, { replace: true, paste: true })
      .click(this.submit);
  }
}

export default new LoginPage();
