# gam-tf

`gam-tf` is a Node.js project focused on test automation using the Playwright framework, with support for
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

- Node.js (preferably version 22 LTS)
- npm (Node Package Manager) or npm

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
- **`/playwright-report`** - **`/test-results`**: contain HTML and JSON reports also screenshots if test is failed
- **`/helpers`**: some helpers for randomise and math date
- **`/enum`**: will be refactored in the future cause folder contain not only enums
  File have FIXME and TODO breadcrumbs, please a follow that before start run

Feel free to extend or customize the directory structure as needed for your project.

---

## Usage

1. **Create `.env` File**:
   Add your environment variables to a `.env` file at the root of the project. Example:

   ```
   BASE_URL=https://example.com
   ```

2. **Write Tests**:
   Write your Playwright tests in the `tests` directory.
3. Right now you can run follow command. :

     ```bash
     npx playwright test --project=chromium
     ```

---

## Development Tools

- **Playwright**: Enables end-to-end test automation.
- **dotenv**: For environment variable management.
- **Prettier**: Ensures consistent code style. Configured with `printWidth: 120`.

---

## Repository

Project is hosted on GitHub:

- **Repository**: [gam-tf](https://github.com/vpiontkovskyi/gam-tf)
- **Issues**: [Report Issues Here](https://github.com/vpiontkovskyi/gam-tf/issues)

---

## Contributing

Contributions, issues, and feature requests are welcome! Feel free to fork the repository, make changes, and submit pull
requests.
