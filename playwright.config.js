// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });
//process.env.DEBUG = 'pw:api';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  // workers: process.env.CI ? 1 : undefined,
  workers: 1, // Set to 1 worker for strict sequential execution

  // custom allure reporter
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  // reporter: [
  //   ['dot'],
  //   ['list'],
  //   ['allure-playwright'],
  //   ['json', {outputFile: 'report.json'}],
  // ],

  reporter: 'html',
  use: {
    baseURL: 'https://test.cybntournaments.com/',
    trace: 'retain-on-failure',
    timeout: 3600000, // 1 hour for each test

  },

  projects: [
    {
      name: 'chrome',
      use: {
        browserName: 'chromium',
        channel: 'chrome',
        headless: false,
        viewport: null,
        actionTimeout: 5000,

        ignoreHTTPSErrors: true,
      },
    },
  ],
  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
