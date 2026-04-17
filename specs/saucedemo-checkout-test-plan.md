# Sauce Demo E-commerce Checkout Test Plan

## Application Overview

Comprehensive test plan for the Sauce Demo e-commerce checkout workflow, covering all acceptance criteria (AC1-AC5), business rules, happy path scenarios, negative validation, edge cases, navigation flows, UI element validation, and mobile responsiveness considerations. Based on user story SCRUM-101.

## Test Scenarios

### 1. Happy Path Checkout Flow

**Seed:** `tests/seed.spec.ts`

#### 1.1. Complete Checkout Process - AC1 through AC4

**File:** `tests/happy-path/complete-checkout.spec.ts`

**Steps:**
  1. Navigate to https://www.saucedemo.com and login with credentials (standard_user/secret_sauce)
    - expect: User successfully logs in
    - expect: Redirected to inventory/products page
    - expect: Products are displayed
  2. Add 2 items to cart (Sauce Labs Backpack $29.99, Sauce Labs Bike Light $9.99)
    - expect: Items are added to cart
    - expect: Cart counter shows '2'
    - expect: Add buttons change to 'Remove'
  3. Click on shopping cart icon to navigate to cart page
    - expect: Redirected to /cart.html
    - expect: Page title shows 'Your Cart'
    - expect: Cart page is displayed
  4. Verify cart review functionality (AC1)
    - expect: All added items displayed with name, description, price, quantity
    - expect: QTY and Description column headers visible
    - expect: Individual prices shown ($29.99, $9.99)
    - expect: 'Continue Shopping' and 'Checkout' buttons available
  5. Click 'Checkout' button to proceed to checkout information
    - expect: Redirected to /checkout-step-one.html
    - expect: Page title shows 'Checkout: Your Information'
    - expect: Form fields for First Name, Last Name, Zip/Postal Code are visible
  6. Fill in checkout information form (AC2): First Name: 'John', Last Name: 'Smith', Zip: '12345'
    - expect: All form fields accept valid input
    - expect: 'Cancel' and 'Continue' buttons are available
    - expect: No error messages displayed
  7. Click 'Continue' button to proceed to order overview
    - expect: Redirected to /checkout-step-two.html
    - expect: Page title shows 'Checkout: Overview'
    - expect: Order overview page is displayed
  8. Verify order overview functionality (AC3)
    - expect: Summary of all items displayed with quantities and prices
    - expect: Payment information shows 'SauceCard #31337'
    - expect: Shipping information shows 'Free Pony Express Delivery!'
    - expect: Price breakdown: Item total: $39.98, Tax: $3.20, Total: $43.18
    - expect: 'Cancel' and 'Finish' buttons available
  9. Click 'Finish' button to complete the order
    - expect: Redirected to /checkout-complete.html
    - expect: Page title shows 'Checkout: Complete!'
    - expect: Order completion page is displayed
  10. Verify order completion functionality (AC4)
    - expect: Success message 'Thank you for your order!' displayed
    - expect: Order dispatch message visible
    - expect: 'Back Home' button available
    - expect: Cart counter disappears (cart cleared)
  11. Click 'Back Home' button to return to products page
    - expect: Redirected to /inventory.html
    - expect: Products page displayed
    - expect: Cart is empty
    - expect: All products show 'Add to cart' buttons

### 2. Checkout Information Validation - AC2 & AC5

**Seed:** `tests/seed.spec.ts`

#### 2.1. Required Field Validation - All Fields Empty

**File:** `tests/validation/required-fields-empty.spec.ts`

**Steps:**
  1. Navigate to checkout information page with items in cart
    - expect: Checkout information page displayed
    - expect: All form fields are empty
    - expect: 'Continue' button is available
  2. Click 'Continue' without filling any fields
    - expect: Error message 'Error: First Name is required' displayed
    - expect: Red validation indicators appear next to all fields
    - expect: Error message has close button (X)
    - expect: User remains on checkout-step-one.html

#### 2.2. Individual Field Validation

**File:** `tests/validation/individual-field-validation.spec.ts`

**Steps:**
  1. Fill only First Name field and click 'Continue'
    - expect: Error message for Last Name requirement displayed
    - expect: Form does not proceed
    - expect: First Name field retains entered value
  2. Fill First Name and Last Name, leave Zip empty and click 'Continue'
    - expect: Error message for Zip/Postal Code requirement displayed
    - expect: Form does not proceed
    - expect: Previously entered values retained
  3. Fill all fields with valid data and click 'Continue'
    - expect: No error messages displayed
    - expect: Successfully proceeds to order overview page
    - expect: All entered data is retained

#### 2.3. Special Characters and Edge Case Input Validation

**File:** `tests/validation/special-characters-validation.spec.ts`

**Steps:**
  1. Enter special characters in First Name field: '!@#$%^&*()'
    - expect: Field accepts special characters
    - expect: No immediate validation error
    - expect: Characters are displayed in field
  2. Enter numeric values in name fields: '12345' in First Name, '67890' in Last Name
    - expect: Fields accept numeric input
    - expect: No validation prevents numeric names
    - expect: Values are retained
  3. Enter very long strings (>255 characters) in each field
    - expect: Field behavior with long input documented
    - expect: System handles long input gracefully
    - expect: No application crashes occur
  4. Enter international characters and accents: 'José', 'François', 'København'
    - expect: International characters accepted
    - expect: Proper encoding and display
    - expect: No character corruption

### 3. Navigation and Flow Control

**Seed:** `tests/seed.spec.ts`

#### 3.1. Cancel Functionality at Each Step - Business Rule 5

**File:** `tests/navigation/cancel-functionality.spec.ts`

**Steps:**
  1. From cart page, navigate to checkout information, then click 'Cancel'
    - expect: Returns to cart page (/cart.html)
    - expect: Cart items remain unchanged
    - expect: No data loss occurs
  2. From checkout information page (with filled data), click 'Cancel'
    - expect: Returns to cart page
    - expect: Cart contents preserved
    - expect: Entered checkout information is not saved
  3. From order overview page, click 'Cancel'
    - expect: Returns to cart page
    - expect: Cart items still present
    - expect: No order is created

#### 3.2. Browser Navigation Controls

**File:** `tests/navigation/browser-navigation.spec.ts`

**Steps:**
  1. Navigate through checkout flow and use browser back button at each step
    - expect: Browser back button works correctly
    - expect: Page state is maintained appropriately
    - expect: No broken navigation states
  2. Use browser forward button after using back button
    - expect: Forward navigation works
    - expect: Form data handling is appropriate
    - expect: No data corruption
  3. Refresh page at each step of checkout process
    - expect: Page refresh behavior documented
    - expect: Cart state handling documented
    - expect: Session management works correctly

#### 3.3. Direct URL Access and Authentication

**File:** `tests/navigation/direct-url-access.spec.ts`

**Steps:**
  1. Attempt to access /cart.html without being logged in
    - expect: Appropriate authentication handling
    - expect: Redirect to login if required
    - expect: No unauthorized access allowed
  2. Attempt to access /checkout-step-one.html directly with empty cart
    - expect: System handles empty cart access
    - expect: Appropriate error handling or redirect
    - expect: No application errors
  3. Attempt to access /checkout-complete.html without completing checkout
    - expect: Prevents unauthorized access to completion page
    - expect: Appropriate redirect or error handling
    - expect: No bypass of checkout process

### 4. Cart Management and Business Rules

**Seed:** `tests/seed.spec.ts`

#### 4.1. Empty Cart Checkout Attempt - Business Rule 3 Validation

**File:** `tests/cart/empty-cart-checkout.spec.ts`

**Steps:**
  1. Navigate to cart page with no items
    - expect: Cart page shows empty state
    - expect: QTY and Description headers still visible
    - expect: 'Continue Shopping' and 'Checkout' buttons present
  2. Click 'Checkout' button with empty cart
    - expect: CURRENT BEHAVIOR: Allows proceeding to checkout-step-one.html
    - expect: EXPECTED: Should prevent checkout or show error message
    - expect: POTENTIAL BUG: Business Rule 3 not enforced
  3. Attempt to complete checkout flow with empty cart
    - expect: Document system behavior with empty cart
    - expect: Identify if order can be placed without items
    - expect: Verify total calculations with no items

#### 4.2. Cart Item Management During Checkout

**File:** `tests/cart/cart-modification-during-checkout.spec.ts`

**Steps:**
  1. Add items to cart, start checkout, then open new tab and modify cart
    - expect: System handles concurrent cart modifications
    - expect: Checkout process reflects current cart state
    - expect: No inconsistent order states
  2. Remove all items from cart while in checkout process (using browser back)
    - expect: System handles cart becoming empty during checkout
    - expect: Appropriate error handling or workflow
    - expect: No incomplete orders created

### 5. UI Element Validation and Accessibility

**Seed:** `tests/seed.spec.ts`

#### 5.1. Visual Elements and Layout Validation

**File:** `tests/ui/visual-elements-validation.spec.ts`

**Steps:**
  1. Verify all page titles are correctly displayed
    - expect: 'Your Cart' on cart page
    - expect: 'Checkout: Your Information' on step one
    - expect: 'Checkout: Overview' on step two
    - expect: 'Checkout: Complete!' on completion page
  2. Verify all buttons have correct labels and are clickable
    - expect: All buttons have appropriate cursor styles
    - expect: Button text is correct and visible
    - expect: Buttons respond to clicks appropriately
  3. Verify form field labels and placeholders
    - expect: Form fields have clear labels
    - expect: Placeholder text if applicable
    - expect: Required field indicators if applicable
  4. Verify price calculations and formatting
    - expect: Individual item prices display correctly
    - expect: Subtotal calculation is accurate
    - expect: Tax calculation is correct
    - expect: Total calculation matches subtotal + tax

#### 5.2. Error Message Display and Accessibility

**File:** `tests/ui/error-messages-accessibility.spec.ts`

**Steps:**
  1. Trigger validation errors and verify message display
    - expect: Error messages are clearly visible
    - expect: Error messages are associated with correct fields
    - expect: Error styling (red indicators) is applied
    - expect: Error messages can be dismissed
  2. Test keyboard navigation through error states
    - expect: Error messages are accessible via keyboard
    - expect: Screen reader compatibility
    - expect: Tab order is logical

### 6. Cross-Browser and Device Testing

**Seed:** `tests/seed.spec.ts`

#### 6.1. Mobile Responsiveness

**File:** `tests/responsive/mobile-checkout-flow.spec.ts`

**Steps:**
  1. Execute complete checkout flow on mobile viewport (375x812)
    - expect: All pages are mobile-responsive
    - expect: Buttons are appropriately sized for touch
    - expect: Form fields are accessible on mobile
    - expect: Text is readable without horizontal scrolling
  2. Test form input on mobile devices
    - expect: Virtual keyboard doesn't obscure input fields
    - expect: Form validation works on mobile
    - expect: Touch interactions work properly
  3. Test cart and checkout navigation on mobile
    - expect: Cart icon/link is accessible on mobile
    - expect: Navigation between checkout steps works on touch
    - expect: Back/Cancel buttons are touch-friendly

#### 6.2. Tablet Responsiveness

**File:** `tests/responsive/tablet-checkout-flow.spec.ts`

**Steps:**
  1. Execute checkout flow on tablet viewport (768x1024)
    - expect: Layout adapts appropriately to tablet size
    - expect: Touch interactions work correctly
    - expect: All functionality remains accessible

#### 6.3. Cross-Browser Compatibility

**File:** `tests/cross-browser/checkout-compatibility.spec.ts`

**Steps:**
  1. Execute full checkout flow in Chrome, Firefox, and Safari
    - expect: Consistent behavior across all browsers
    - expect: Visual elements render correctly
    - expect: Form validation works consistently
    - expect: JavaScript functionality operates properly

### 7. Performance and Load Testing

**Seed:** `tests/seed.spec.ts`

#### 7.1. Checkout Process Performance

**File:** `tests/performance/checkout-performance.spec.ts`

**Steps:**
  1. Measure page load times for each checkout step
    - expect: Cart page loads within acceptable time
    - expect: Checkout information page loads quickly
    - expect: Order overview page renders promptly
    - expect: Order completion page displays quickly
  2. Test checkout process with network throttling
    - expect: Process works on slow connections
    - expect: Appropriate loading indicators if present
    - expect: No timeout errors during normal flow

### 8. Edge Cases and Boundary Testing

**Seed:** `tests/seed.spec.ts`

#### 8.1. Boundary Value Testing

**File:** `tests/edge-cases/boundary-value-testing.spec.ts`

**Steps:**
  1. Add maximum number of same item to cart (if limit exists)
    - expect: System handles maximum quantities appropriately
    - expect: Price calculations remain accurate
    - expect: No integer overflow issues
  2. Add all available products to cart
    - expect: Cart can handle all products
    - expect: Checkout flow works with maximum items
    - expect: Performance remains acceptable
  3. Test with very long item names or descriptions (if customizable)
    - expect: Layout handles long text appropriately
    - expect: No text overflow issues
    - expect: Responsive behavior maintained

#### 8.2. Session and State Management

**File:** `tests/edge-cases/session-state-management.spec.ts`

**Steps:**
  1. Complete checkout flow with session timeout during process
    - expect: Appropriate session handling
    - expect: User experience with expired sessions
    - expect: No data loss or corruption
  2. Test checkout with multiple browser tabs/windows
    - expect: Consistent cart state across tabs
    - expect: No conflicts with simultaneous access
    - expect: Proper session management
