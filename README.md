# QA Automation Portfolio

[![QA automation](https://github.com/QApedroHenrique/qa-automation-portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/QApedroHenrique/qa-automation-portfolio/actions/workflows/ci.yml)

Test automation across **web UI, API and mobile**, built with the tools and patterns I use day to day as a QA professional.

Everything here runs against **public demo applications made for practising automation**. The repository contains no proprietary code, data or credentials.

| Layer | Tool | Application under test | Highlights |
| --- | --- | --- | --- |
| Web UI | **Cypress** | [Sauce Demo](https://www.saucedemo.com), [Automation Exercise](https://automationexercise.com) | Page Objects, data-driven cases, `cy.session`, API seeding for UI tests |
| Web UI | **TestCafe** | [Practice Test Automation](https://practicetestautomation.com/practice-test-login/), [The Internet](https://the-internet.herokuapp.com) | Page Model, async content without fixed waits |
| API | **Postman + Newman** | [Restful Booker](https://restful-booker.herokuapp.com) | Chained flow, JSON Schema validation, auth token reuse, negative cases |
| Mobile | **Maestro** | [Wikipedia Android app](https://github.com/wikimedia/apps-android-wikipedia) | Reusable conditional subflows |
| CI | **GitHub Actions** | — | Three parallel jobs with HTML reports as artifacts |

## Project structure

```
.
├── .github/workflows/ci.yml     # CI: API, TestCafe and Cypress jobs in parallel
├── api/                         # Postman collection + environment (run with Newman)
├── cypress/
│   ├── e2e/
│   │   ├── auth/                # login, lockout, protected routes, logout
│   │   ├── shop/                # product list, sorting, cart, checkout
│   │   └── signup/              # registration and login with API-seeded accounts
│   ├── fixtures/                # test data
│   ├── pages/                   # Page Objects
│   └── support/                 # custom commands and data builders
├── mobile/                      # Maestro flows (Android)
├── testcafe/
│   ├── pages/                   # Page Model
│   └── tests/
├── cypress.config.js
└── .testcaferc.json
```

## What is covered

### Cypress: e-commerce and authentication

- **Login:** valid login, required-field validation, wrong password, locked-out user, dismissing errors, blocking protected pages without a session, and logout.
- **Product list:** all products are rendered, sorting by price (both directions) and by name, and the cart badge updates as items are added and removed.
- **Checkout:** a full purchase with **item total, tax and order total recalculated and checked** in the test, plus a required-field check for each customer field.
- **Sign-up:** full registration through the UI, duplicate e-mail, and login with accounts **created and deleted through the public API**, so every test is independent and cleans up after itself.

### TestCafe: login and dynamic pages

- Valid login, unknown user, wrong password, error state before submitting, and logout.
- Elements that appear, disappear or become enabled after async requests, handled with retrying assertions instead of fixed sleeps.

### Postman / Newman: booking API regression

A single chained run: **health → auth → create → read → search → update → partial update → delete → confirm deletion → negative cases**.

- Each request saves what the next one needs (`token`, `bookingId`, generated guest data) in collection variables.
- The create response is validated against a **JSON Schema**.
- Authorization is checked both ways: an update **without** a token must return 403.
- A collection-level test checks the **response time** of every request.

### Maestro: mobile smoke flow

Fresh install → skip onboarding (only if it appears) → search → open an article. See [`mobile/README.md`](mobile/README.md).

## Running locally

Requirements: **Node.js 22+** and **Google Chrome**. Mobile flows also need the Maestro CLI and an Android emulator.

```bash
npm ci

npm run test:api          # Newman, with an HTML report in reports/api
npm run test:testcafe     # TestCafe, headless Chrome
npm run test:e2e          # Cypress, headless Chrome
npm run cy:open           # Cypress interactive runner
npm run test:mobile       # Maestro (needs an emulator)
```

Reports are written to `reports/` (Mochawesome for Cypress, htmlextra for Newman, xUnit and screenshots for TestCafe). In CI they are uploaded as workflow artifacts.

## Design decisions

- **Page Objects / Page Model** keep selectors in one place, so tests read like the user journey.
- **Stable selectors:** `data-test` / `data-qa` attributes first, never auto-generated classes.
- **Independent tests:** every test creates its own data and cleans it up. Nothing depends on the order tests run in.
- **Fast setup:** `cy.session` caches logins, and accounts are seeded through the API when the UI is not what is being tested.
- **No fixed waits:** both frameworks rely on retrying assertions.
- **Less noise on public sites:** ad and tracking hosts are blocked in Cypress, and retries only run in CI.
- **No secrets in the repository:** only the public demo credentials published by each site. Real projects would keep these in CI secrets or environment variables, and `.env` and `cypress.env.json` are already git-ignored.

## Findings

While writing the API suite I documented two behaviours of the Restful Booker demo API that would be bugs in a real product:

1. `POST /booking` with missing required fields returns **500 Internal Server Error** instead of a 4xx validation error.
2. `POST /auth` with wrong credentials returns **200 OK** with `{"reason": "Bad credentials"}` instead of 401.

The tests check the current behaviour and explain it in comments, so a fix in the API would be noticed.

## About me

**Pedro Henrique** · QA & Test Automation · Campina Grande, Brazil
[LinkedIn](https://www.linkedin.com/in/pedro-henrique-996aa7355/)
