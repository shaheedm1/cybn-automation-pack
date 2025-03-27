import { test } from '@playwright/test';
import CommonUtils from '../utils/CommonUtils';
import RegistrationPage from '../pageObjects/RegistrationPage';
import testData from '../testData.json';

let common;
let reg;

test.beforeEach(async ({ page }) => {
    common = new CommonUtils(page);
    await common.openCYBN();
});

test('CYBN-REG-TC001:Verify user is succesfully created from registration page', async ({ page }, testInfo) => {
    reg = new RegistrationPage(page);
    common = new CommonUtils(page);
    await reg.User_Navigates_to_Registration_Page();
    await reg.User_fills_Registration_form_and_clicks_Register();
    //handle captcha frame
    await common.takeScreenshot(testInfo);
});

test('CYBN-REG-TC001:Verify user is succesfully CLEARED registration form using Clear button', async ({ page }, testInfo) => {
    reg = new RegistrationPage(page);
    common = new CommonUtils(page);
    await reg.User_Navigates_to_Registration_Page();
    await reg.User_fills_Registration_form_and_clicks_Clear();
    await common.takeScreenshot(testInfo);
});