import { Selector } from 'testcafe';

/** Page shown after a successful login. */
class SecureAreaPage {
  constructor() {
    this.heading = Selector('h1').withText('Logged In Successfully');
    this.welcomeMessage = Selector('.post-content strong').withText('Congratulations');
    this.logoutButton = Selector('a').withExactText('Log out');
  }
}

export default new SecureAreaPage();
