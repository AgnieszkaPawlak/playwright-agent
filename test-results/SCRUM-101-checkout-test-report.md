# SCRUM-101 Checkout Test Report

## 1. Executive Summary

- Story: SCRUM-101 - E-commerce Checkout Process
- Application: https://www.saucedemo.com
- Test credentials: `standard_user` / `secret_sauce`
- Total planned scenarios from test plan: 17
- Manual exploratory scenarios executed: 7
- Automated tests implemented: 10
- Automated browser executions completed: 30
- Final automation result: 30 passed, 0 failed across Chromium, Firefox, and WebKit
- Overall status: PASS with 1 confirmed product defect logged from exploratory testing

The checkout workflow is stable for the primary user journey across all configured desktop browsers. Core acceptance criteria AC1 through AC4 are covered by both exploratory testing and automation. A business-rule gap remains open for AC5 and Business Rule 3: the application currently allows checkout and order completion with an empty cart.

## 2. Manual Test Results

### 2.1 Executed Exploratory Scenarios

| ID | Scenario | Result | Notes |
| --- | --- | --- | --- |
| M-01 | Happy path checkout with backpack and bike light | Pass | Cart review, checkout info, overview totals, completion, and cart clearing all behaved as expected |
| M-02 | Submit checkout info form with all fields empty | Pass | Error displayed: `Error: First Name is required`; field error styling shown |
| M-03 | Submit checkout info with first name only | Pass | Error advanced correctly to `Error: Last Name is required`; entered first name persisted |
| M-04 | Direct access to `/cart.html` while logged out | Pass | User was redirected back to login page |
| M-05 | Cancel from checkout information step | Pass | Returned to cart and preserved cart contents |
| M-06 | Empty-cart checkout attempt | Fail | Application allowed progression to checkout overview and completion with zero items |
| M-07 | Mobile cart responsiveness at `375x812` | Pass | Layout remained usable without horizontal overflow |

### 2.2 Key Observations

- Cart review page correctly displayed item names, descriptions, quantities, prices, and navigation controls.
- Checkout information form correctly enforced required-field sequencing for empty and partially completed submissions.
- Order overview showed stable summary values for the tested data set:
  - Item total: `$39.98`
  - Tax: `$3.20`
  - Total: `$43.18`
- Completion page showed the expected confirmation message and cleared the cart when returning home.
- Authentication gating for direct cart access behaved correctly.
- Cancel navigation from checkout step one preserved cart state correctly.

### 2.3 Evidence Captured

- `manual-cart-review.png`
- `manual-checkout-step-one.png`
- `manual-validation-empty-fields.png`
- `manual-checkout-overview.png`
- `manual-checkout-complete.png`
- `manual-empty-cart-overview-bug.png`
- `manual-mobile-cart-view.png`

## 3. Automated Test Results

### 3.1 Implemented Suite

Automation was created under `tests/saucedemo-checkout/` using stable `data-test` selectors validated during exploratory testing.

Implemented coverage includes:

- Happy path completion
- Required-field validation sequencing
- Navigation and cancel behavior
- Unauthenticated direct access redirect
- Mobile viewport usability
- Empty-cart checkout business-rule coverage as a known defect check

### 3.2 Initial Automation Results

- First focused Chromium run: 9 passed, 1 failed
- Initial failure cause: brittle URL assertion in generated file `tests/saucedemo-checkout/complete-checkout.spec.ts`
- Failure class: test assertion mismatch, not a product defect

### 3.3 Healing Activities Performed

- Corrected relative `toHaveURL()` assertions in the generated TypeScript happy-path file to regex-based assertions matching the full absolute URL returned by Playwright.
- Re-ran the focused Chromium suite after the fix.

### 3.4 Final Automation Results

| Browser | Passed | Failed |
| --- | --- | --- |
| Chromium | 10 | 0 |
| Firefox | 10 | 0 |
| WebKit | 10 | 0 |
| Total | 30 | 0 |

### 3.5 Final Suite Status

- Final suite status: Stable and green across all configured browsers
- Remaining unrepaired automation issues: None
- Remaining product issue outside test harness: Empty-cart checkout rule violation

## 4. Defects Log

### BUG-SCRUM-101-001

- Severity: High
- Title: Checkout can be completed with an empty cart
- Description: A logged-in user with no items in the cart can still click `Checkout`, enter checkout information, reach the order overview, and complete an order with totals of `$0.00`.
- Steps to Reproduce:
  1. Login as `standard_user`
  2. Open the cart with no items added
  3. Click `Checkout`
  4. Enter any valid first name, last name, and postal code
  5. Click `Continue`
  6. Click `Finish`
- Expected Behavior: The system should block checkout when the cart is empty and show an appropriate validation or redirect message.
- Actual Behavior: The system proceeds through checkout overview and order completion with zero cart items and zero-value totals.
- Evidence: `manual-empty-cart-overview-bug.png`
- Environment: Sauce Demo on Chromium exploratory session; behavior confirmed in automation design as a known product defect

## 5. Test Coverage Analysis

### 5.1 Acceptance Criteria Coverage

| Acceptance Criterion | Manual Coverage | Automated Coverage | Status |
| --- | --- | --- | --- |
| AC1 - Cart Review | Yes | Yes | Covered |
| AC2 - Checkout Information Entry | Yes | Yes | Covered |
| AC3 - Order Overview | Yes | Yes | Covered |
| AC4 - Order Completion | Yes | Yes | Covered |
| AC5 - Error Handling | Partial | Partial | Covered for required fields; product gap remains for empty-cart control |

### 5.2 Business Rule Coverage

| Business Rule | Status | Notes |
| --- | --- | --- |
| All checkout form fields are mandatory | Pass | Required-field validation works |
| Users must be logged in to access checkout | Pass | Direct cart access while logged out redirects to login |
| Cart cannot be empty when proceeding to checkout | Fail | Confirmed defect |
| Order confirmation should clear the cart | Pass | Cart badge cleared after completion |
| Users can cancel checkout at any step and return to cart | Pass | Verified from checkout information step |

### 5.3 Coverage Gaps

- Tablet-specific exploratory validation was planned but not executed in this pass.
- Performance and throttled-network scenarios were planned but not executed in this pass.
- Multi-tab and session-timeout edge cases remain in the test plan but were not automated in this implementation slice.

## 6. Summary and Recommendations

The tested checkout workflow is functionally sound for the primary purchase journey and is now backed by a stable cross-browser automation suite. The only confirmed application defect from this workflow is the missing guard against empty-cart checkout.

Recommended next steps:

1. Fix BUG-SCRUM-101-001 by blocking checkout initiation or completion when the cart is empty.
2. Convert the known-defect automation check into a standard passing assertion once the application fix is deployed.
3. Expand automation to cover planned but unimplemented tablet, performance, and session-state scenarios.