import { Selector, t } from 'testcafe';

class SecureAreaPage {
  constructor() {
    this.heading = Selector('h2').withText('Secure Area');
    this.logoutButton = Selector('a[href="/logout"]');
  }

  async logout() {
    await t.click(this.logoutButton);
  }
}

export default new SecureAreaPage();
