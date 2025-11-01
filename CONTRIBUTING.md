# Contributing to Raktchain

Thank you for your interest in contributing to BloodLink! We welcome contributions from the community to help improve our blood donation platform.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [How to Contribute](#how-to-contribute)
- [Development Process](#development-process)
- [Pull Request Guidelines](#pull-request-guidelines)
- [Reporting Issues](#reporting-issues)
- [Style Guides](#style-guides)

## Code of Conduct

This project adheres to the [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to the project maintainers.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/your-username/bloodlink.git`
3. Create a new branch for your feature or bug fix: `git checkout -b feature/your-feature-name`
4. Make your changes
5. Commit your changes following our [commit message conventions](#git-commit-messages)
6. Push to your fork: `git push origin feature/your-feature-name`
7. Open a Pull Request

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/bloodlink.git
cd bloodlink

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

## How to Contribute

### Reporting Bugs

Before submitting a bug report, please check if the issue has already been reported. If you find an existing issue, feel free to add additional information.

To submit a bug report:

1. Open a new issue
2. Include a clear title and description
3. Provide steps to reproduce the issue
4. Include expected vs actual behavior
5. Add any relevant screenshots or error messages
6. Include your environment details (OS, browser, Node version, etc.)

### Suggesting Enhancements

We welcome ideas for new features or improvements to existing functionality. To suggest an enhancement:

1. Check if there's already an issue or discussion about your idea
2. If not, open a new issue with:
   - A clear title and description
   - An explanation of why this enhancement would be useful
   - Any implementation suggestions (if you have any)

### Code Contributions

1. Look for issues labeled `good first issue` or `help wanted` if you're new to the project
2. Comment on the issue to let others know you're working on it
3. Follow the [development process](#development-process) outlined below
4. Submit your changes as a Pull Request

## Development Process

1. Ensure you have the latest version of the code: `git pull origin main`
2. Create a new branch for your changes: `git checkout -b feature/your-feature-name`
3. Make your changes, following our [style guides](#style-guides)
4. Write or update tests as needed
5. Run the test suite to ensure everything works
6. Update documentation if necessary
7. Commit your changes following our [commit message conventions](#git-commit-messages)
8. Push your branch to your fork
9. Open a Pull Request to the `main` branch

## Pull Request Guidelines

- Keep PRs focused on a single feature or bug fix
- Include a clear title and description explaining what changes were made
- Reference any related issues using keywords like "Fixes #123" or "Closes #123"
- Ensure your code follows our [style guides](#style-guides)
- Write clear, descriptive commit messages
- Make sure all tests pass
- Be responsive to feedback during the review process

## Reporting Issues

Before reporting an issue, please check if it has already been reported. If you find an existing issue that describes your problem, add a comment with any additional information instead of creating a new issue.

When reporting a bug, please include:

- A clear and descriptive title
- Steps to reproduce the issue
- Expected behavior vs. actual behavior
- Screenshots if applicable
- Your environment information (OS, browser, Node version, etc.)

## Style Guides

### Git Commit Messages

- Use the present tense ("Add feature" not "Added feature")
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit the first line to 72 characters or less
- Reference issues and pull requests liberally after the first line
- Consider starting the commit message with an applicable emoji:
  - :art: `:art:` when improving the format/structure of the code
  - :racehorse: `:racehorse:` when improving performance
  - :non-potable_water: `:non-potable_water:` when plugging memory leaks
  - :memo: `:memo:` when writing docs
  - :bug: `:bug:` when fixing a bug
  - :fire: `:fire:` when removing code or files
  - :green_heart: `:green_heart:` when fixing the CI build
  - :white_check_mark: `:white_check_mark:` when adding tests
  - :lock: `:lock:` when dealing with security
  - :arrow_up: `:arrow_up:` when upgrading dependencies
  - :arrow_down: `:arrow_down:` when downgrading dependencies
  - :shirt: `:shirt:` when removing linter warnings

### JavaScript/React Style Guide

- Follow the existing code style in the project
- Use functional components with hooks when possible
- Use PropTypes for component prop validation
- Write clean, readable code with meaningful variable names
- Comment complex logic
- Follow accessibility best practices

### Backend (Node.js/Express) Style Guide

- Follow RESTful API design principles
- Use consistent error handling
- Validate all inputs
- Write secure code following OWASP guidelines
- Document APIs appropriately

Thank you for contributing to BloodLink!