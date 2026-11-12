const { defineConfig } = require('cypress');

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: 'reports/cypress',
    reportPageTitle: 'Cypress E2E report',
    charts: true,
    embeddedScreenshots: true,
    inlineAssets: true,
  },
  viewportWidth: 1366,
  viewportHeight: 768,
  video: false,
  screenshotsFolder: 'reports/cypress/screenshots',
  // Retry only in headless runs (CI), so flaky behaviour stays visible while developing.
  retries: { runMode: 1, openMode: 0 },
  // Third-party ad and tracking scripts make public demo sites slow and flaky.
  blockHosts: [
    '*.googlesyndication.com',
    '*.doubleclick.net',
    '*.googleadservices.com',
    '*.google-analytics.com',
    '*.googletagmanager.com',
    '*.adtrafficquality.google',
    'fundingchoicesmessages.google.com',
  ],
  e2e: {
    baseUrl: 'https://www.saucedemo.com',
    specPattern: 'cypress/e2e/**/*.cy.js',
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      return config;
    },
  },
});
