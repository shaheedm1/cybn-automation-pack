import { test } from '@playwright/test';
import LoginPage from '../pageObjects/LoginPage';
import CommonUtils from '../utils/CommonUtils';
import testData from '../testData.json';

const fs = require('fs');
let common;
let loginPage;

test.beforeEach(async ({ page }) => {
  common = new CommonUtils(page);
  loginPage = new LoginPage(page);

  await common.navigateTo(testData.loginUrl);
  await common.waitForTime(5000);
  const title = await page.title();
  console.log(`Page title: ${title}`);
  await loginPage.logintoCYBN(`${testData.uname}`, `${testData.password}`);
  await common.takeScreenshot('login');
  await common.storeCookies();
});

test('CYBN-TC001-Login : Verify that the user can log in with correct credentials and logs out', async ({ page }, testInfo) => {
  common = new CommonUtils(page);
  loginPage = new LoginPage(page);
  await common.useCookies();
  await page.goto(testData.loginUrl);
  await common.takeScreenshot(testInfo);
  await loginPage.Logout();
});