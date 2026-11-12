import { ClientFunction } from 'testcafe';
import loginPage from '../pages/LoginPage';
import secureAreaPage from '../pages/SecureAreaPage';

// Public demo credentials shown on the login page itself.
const VALID_USER = { username: 'tomsmith', password: 'SuperSecretPassword!' };

const getPath = ClientFunction(() => window.location.pathname);

fixture('Login · The Internet').page(loginPage.url);

test('logs in with valid credentials', async (t) => {
  await loginPage.login(VALID_USER.username, VALID_USER.password);

  await t
    .expect(getPath()).eql('/secure')
    .expect(secureAreaPage.heading.visible).ok()
    .expect(loginPage.flash.innerText).contains('You logged into a secure area!');
});

const invalidAttempts = [
  { scenario: 'an unknown username', username: 'unknown_user', password: VALID_USER.password, error: 'Your username is invalid!' },
  { scenario: 'a wrong password', username: VALID_USER.username, password: 'wrong-password', error: 'Your password is invalid!' },
];

invalidAttempts.forEach(({ scenario, username, password, error }) => {
  test(`rejects ${scenario}`, async (t) => {
    await loginPage.login(username, password);

    await t
      .expect(getPath()).eql('/login')
      .expect(loginPage.flash.hasClass('error')).ok()
      .expect(loginPage.flash.innerText).contains(error);
  });
});

test('logs out and returns to the login page', async (t) => {
  await loginPage.login(VALID_USER.username, VALID_USER.password);
  await secureAreaPage.logout();

  await t
    .expect(getPath()).eql('/login')
    .expect(loginPage.flash.innerText).contains('You logged out of the secure area!');
});
