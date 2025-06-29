# Contributing to IdeaForge Local

Thank you for your interest in improving IdeaForge Local! This guide explains how to set up the project for development, run the test suite, and submit pull requests.

## Development Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Optional: configure environment variables**
   If you plan to use the optional AI features, create a `.env` file in the project root and add your Gemini API key:
   ```env
   API_KEY=YOUR_GEMINI_API_KEY
   ```

## Running Tests

Before opening a pull request, make sure the codebase passes linting, formatting, and unit tests:

```bash
npm run lint
npm run format
npm test
```

To generate a coverage report, run:

```bash
npm test -- --coverage
```

## Submitting Pull Requests

1. Create a feature branch based on `main`.
2. Commit your changes with clear messages and push the branch to your fork.
3. Open a pull request describing the changes and the motivation behind them.
4. Ensure your branch passes all CI checks before requesting a review.

We appreciate your contributions!
