# Playwright MCP QA Workflow

This repository contains a sample end-to-end QA workflow built with Playwright, MCP agents, and the artifacts created for the `SCRUM-101 - E-commerce Checkout Process` user story against the Sauce Demo application.

The project includes:

- a checkout test plan,
- exploratory testing evidence and the final test report,
- automated Playwright tests for checkout scenarios,
- Playwright configuration for Chromium, Firefox, and WebKit.

## Project Structure

```text
.
├── artifacts/
│   └── manual-screenshots/
├── prompt.md
├── playwright.config.ts
├── specs/
│   ├── README.md
│   └── saucedemo-checkout-test-plan.md
├── test-results/
│   └── SCRUM-101-checkout-test-report.md
├── tests/
│   ├── example.spec.ts
│   ├── seed.spec.ts
│   └── saucedemo-checkout/
│       ├── checkout.business-rules.spec.js
│       ├── checkout.happy-path.spec.js
│       ├── checkout.navigation.spec.js
│       ├── checkout.responsive.spec.js
│       ├── checkout.validation.spec.js
│       ├── complete-checkout.spec.ts
│       └── helpers.js
└── uesr-stories/
    └── SCRUM-101-ecommerce-checkout.md
```

## Preinstallation

Install and configure the following tools before running the tests.

### 1. Required Tools

- Node.js LTS, preferably `20.x` or newer
- `npm` available in the terminal
- Git
- Visual Studio Code
- Playwright browsers: Chromium, Firefox, and WebKit

Check the installed versions:

```powershell
node -v
npm -v
git --version
```

### 2. Install Project Dependencies

Run the following in the project root:

```powershell
npm install
```

If Playwright is being used on this machine for the first time, install the browsers as well:

```powershell
npx playwright install
```

### 3. Environment Setup

This project does not require a local backend or a `.env` file for the main test flow. The tests run against the public application:

```text
https://www.saucedemo.com
```

Test credentials used in the checkout scenarios:

```text
Username: standard_user
Password: secret_sauce
```

### 4. MCP Agent Setup in VS Code

If you want to reproduce the workflow with MCP agents and Playwright tools in VS Code, initialize the agent loop with:

```powershell
npx playwright init-agents --loop=vscode
```

This prepares the editor environment for Playwright agent-based workflows.

## How to Run the Tests

### Run the Full Checkout Suite

```powershell
npx playwright test tests/saucedemo-checkout
```

By default, the suite runs against all browser projects defined in the configuration:

- Chromium
- Firefox
- WebKit

### Run Tests in a Single Browser

Chromium:

```powershell
npx playwright test tests/saucedemo-checkout --project=chromium
```

Firefox:

```powershell
npx playwright test tests/saucedemo-checkout --project=firefox
```

WebKit:

```powershell
npx playwright test tests/saucedemo-checkout --project=webkit
```

### Run a Single Test File

Example for checkout validation coverage:

```powershell
npx playwright test tests/saucedemo-checkout/checkout.validation.spec.js --project=chromium
```

### Open the Playwright HTML Report

After a test run, open the Playwright HTML report with:

```powershell
npx playwright show-report
```

## Workflow Artifacts

- User story: `uesr-stories/SCRUM-101-ecommerce-checkout.md`
- Test plan: `specs/saucedemo-checkout-test-plan.md`
- Final report: `test-results/SCRUM-101-checkout-test-report.md`
- Automated test suite: `tests/saucedemo-checkout/`
- Manual testing screenshots: `artifacts/manual-screenshots/`

## Automation Coverage

The automated suite covers:

- the checkout happy path,
- required-field validation,
- navigation and checkout cancellation,
- mobile viewport behavior,
- business-rule checks for empty-cart checkout.

The workflow also confirmed a product defect: the application currently allows order completion with an empty cart. This is documented in the final test report.

## Notes

- `playwright.config.ts` does not define `npm` scripts, so tests are executed with `npx playwright test`.
- The user stories folder is currently named `uesr-stories/` in the repository, and the README reflects the actual project structure.