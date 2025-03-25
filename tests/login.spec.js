import { test } from '@playwright/test';
import LoginPage from '../pageObjects/LoginPage';
import Common from '../utils/Common';
import testData from '../testData.json';
const fs = require('fs');
let common;
let loginPage;

test.beforeEach(async ({ page }) => {
  common = new Common(page);
  loginPage = new LoginPage(page);

  await common.navigateTo(testData.loginUrl);
  await common.waitForTime(5000);
  const title = await page.title();
  console.log(`Page title: ${title}`);
  await loginPage.login(`${testData.uname}`, `${testData.password}`);
  await common.takeScreenshot('login');
  await common.storeCookies();
});

test('CYBN-TC001', async ({ page }, testInfo) => {
  common = new Common(page);
  loginPage = new LoginPage(page);
  await common.useCookies();
  await page.goto(testData.baseUrl);
  const title = await page.title();
  console.log(`Page title after using cookies: ${title}`);
  await common.takeScreenshot(testInfo);
});

// test('CYBN-TC002', async ({ page }) => {