import { ClientFunction } from 'testcafe';
import loginPage from '../pages/LoginPage';
import secureAreaPage from '../pages/SecureAreaPage';

// Public demo credentials shown on the login page itself.
const VALID_USER = { username: 'student', password: 'Password123' };

const getPath = ClientFunction(() => window.location.pathname);

fixture('Login · Practice Test Automation').page(loginPage.url);

test('logs in with valid credentials', async (t) => {
  await loginPage.login(VALID_USER.username, VALID_USER.password);

  await t
    .expect(getPath()).eql('/logged-in-successfully/')
    .expect(secureAreaPage.heading.visible).ok()
    .expect(secureAreaPage.welcomeMessage.innerText).contains(`Congratulations ${VALID_USER.username}`)
    .expect(secureAreaPage.logoutButton.visible).ok();
});

const invalidAttempts = [
  { scenario: 'an unknown username', username: 'unknown_user', password: VALID_USER.password, error: 'Your username is invalid!' },
  { scenario: 'a wrong password', username: VALID_USER.username, password: 'wrong-password', error: 'Your password is invalid!' },
];

invalidAttempts.forEach(({ scenario, username, password, error }) => {
  test(`rejects ${scenario}`, async (t) => {
    await loginPage.login(username, password);

    await t
      .expect(loginPage.error.hasClass('show')).ok()
      .expect(loginPage.error.innerText).eql(error)
      .expect(getPath()).eql('/practice-test-login/');
  });
});

test('does not show an error before submitting', async (t) => {
  await t.expect(loginPage.error.hasClass('show')).notOk();
});

test('logs out and returns to the login page', async (t) => {
  await loginPage.login(VALID_USER.username, VALID_USER.password);
  await t.expect(secureAreaPage.heading.visible).ok();

  await secureAreaPage.logout();

  await t
    .expect(getPath()).eql('/practice-test-login/')
    .expect(loginPage.username.visible).ok();
});
