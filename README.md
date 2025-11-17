# Playwright Test Suite
This repository contains some end-to-end tests for the **https://practicesoftwaretesting.com/** website using **Playwright/Typescript**. These tests are written only for chromium web viewport. Use the BASE_URL variable in the .env file to switch websites.

---
## Pre-requisites

- [Node.js](https://nodejs.org/) (v16+ recommended)  
- [npm](https://www.npmjs.com/)

  ---
## Installation

Clone the repository:

```bash
git clone <your-repo-url>
cd <your-repo-folder>
```

Install playwright and other dependencies from package.json:
```bash
npm install
```

Install playwright browsers:
```bash
npx playwright install
```

Run tests in headless mode (default):
```bash
npx playwright test
```

Run tests in headed mode (with browser UI):
```bash
npx playwright test --headed
```

Run a specific test file:
```bash
npx playwright test <test-file>
```

Show test report:
```bash
npx playwright show-report
```
