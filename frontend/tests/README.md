# Frontend Testing

This directory contains tests for the BloodLink frontend.

## Test Structure

- `unit/` - Unit tests for individual components and functions
- `integration/` - Integration tests for component interactions
- `e2e/` - End-to-end tests for user flows

## Running Tests

```bash
cd frontend
npm test
```

## Test Framework

Currently, the project uses a simple test setup. For more comprehensive testing, consider adding:

- Jest for unit and integration tests
- React Testing Library for component testing
- Cypress or Playwright for end-to-end testing

## Example Test Commands

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run specific test file
npm test -- tests/unit/example.test.js
```

## Test Coverage

To add test coverage, install the following dependencies:

```bash
npm install --save-dev jest @testing-library/react @testing-library/jest-dom
```

Then update the test script in package.json:

```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
  }
}
```