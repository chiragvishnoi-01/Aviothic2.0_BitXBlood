# Backend Testing

This directory contains tests for the BloodLink backend.

## Test Structure

- `unit/` - Unit tests for individual functions and modules
- `integration/` - Integration tests for API endpoints
- `e2e/` - End-to-end tests for complete workflows

## Running Tests

```bash
cd backend
npm test
```

## Test Framework

Currently, the project uses a simple test setup. For more comprehensive testing, consider adding:

- Jest for unit and integration tests
- Supertest for API testing
- MongoDB Memory Server for database testing

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
npm install --save-dev jest supertest mongodb-memory-server
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