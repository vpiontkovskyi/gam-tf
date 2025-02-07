# gam-tf

`gam-tf -GoTaskMe-TestFramework` is a Node.js project focused on test automation using the Playwright framework, with
support for
environmental variable management and code formatting.
The author does not have extensive experience with TypeScript, so the solution might not be optimal; use it at your own
risk.

## Features
- **Test Automation**: Built using [Playwright](https://playwright.dev/), a powerful test automation framework.
- **Environment Support**: Manage environment variables with [dotenv](https://github.com/motdotla/dotenv).
- **Code Formatting**: Maintain code quality with [Prettier](https://prettier.io/).
- **Reports** by [Playwright](https://playwright.dev/)
---

## Requirements

- `Node.js` (preferably version 22 LTS)
- `npm` (Node Package Manager) or npm
---

## Installation
To install the dependencies, run:

   ```bash
   npm install
   ```
---

## Directory Structure
- **`/tests`**: Directory containing all your test scripts and E2E test cases.
- **`/pages`**: Page objects and a bit more
- **`/playwright-report`** - **`/test-results`**: contain HTML and JSON reports, screenshots and state traces
- **`/helpers`**: some helpers for randomise and math date
- **`/enum`**: will be refactored in the future cause folder contain not only enums
  Some files have FIXME and TODO breadcrumbs, its will be refactored soon too
Feel free to extend or customize the directory structure as needed for your project.
---

## Usage
1. **Create `.env` File**:
   Add your environment variables to a `.env` file at the root of the project.
   Example:
    ```
    MAIN_URL=https://gotaskme.com
    BASE_URL=https://app.gotaskme.com
    ```
2. **Write Tests**:
   Write your Playwright tests in the `tests` directory.
3. Right now must **choice credentials** for the test account.
   The framework requires creating an empty test account with a confirmed email.
   The email and password should be **specified** as parameters before starting.
   The for local test run command will look like this:
    ```bash
    TEST_USER_EMAIL=v.***il.com TEST_USER_PASSWORD=ji***oj npx playwright test
    ```
---

### Review report and debug

1. If you want to open a report just run command:
   ```bash
   npx playwright show-report
   ```

You can download artifacts from CI and paste report files to `playwright-report` folder for review report form CI.

2. To run the debug instance of the browser with Playwright inspector, run command:
   ```bash
   npx playwright test --debug
   ```

## Repository
Project is hosted on GitHub:
- **Repository**: [gam-tf](https://github.com/vpiontkovskyi/gam-tf)
- **Issues**: [Report Issues Here](https://github.com/vpiontkovskyi/gam-tf/issues)
---

## Contributing
Contributions, issues, and feature requests are welcome! Feel free to fork the repository, make changes, and submit pull
requests.
