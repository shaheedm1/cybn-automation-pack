import testData from '../testData.json';
const fs = require('fs');

class CommonUtils {
  constructor(page) {
    this.page = page;
  }

  async openCYBN() {
    let attempts = 0;
    const maxAttempts = 3;

    while (attempts < maxAttempts) {
      try {
        await this.page.goto("/", { timeout: 10000 });
        return;
      } catch (error) {
        attempts++;
        console.log(`Attempt ${attempts} to load CYBN failed. Retrying...`);
        if (attempts === maxAttempts) {
          throw new Error("Failed to load CYBN after 3 attempts");
        }
      }
    }
  }

  async navigateTo(url) {

    await this.page.goto(url, { timeout: 60000 });
  }

  async waitForTime(milliseconds) {
    await this.page.waitForTimeout(milliseconds);
  }

  async takeScreenshot(testInfo) {
    let baseFileName = testInfo?.title || "Log";

    const now = new Date();
    const datePart = `${now.getDate().toString().padStart(2, '0')}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getFullYear()}`;
    const timePart = `${now.getHours().toString().padStart(2, '0')}${now.getMinutes().toString().padStart(2, '0')}${now.getSeconds().toString().padStart(2, '0')}`;
    const fs = require('fs');
    const path = require('path');

    const folderName = path.join('test-results', `Test results-${datePart}`);
    if (!fs.existsSync(folderName)) {
      fs.mkdirSync(folderName, { recursive: true });
    }

    const filePath = path.join(folderName, `${baseFileName}-${timePart}.png`);
    await this.page.screenshot({ path: filePath });
  }

  async storeCookies() {
    //store cookie after login
    const cookies = await this.page.context().cookies();
    if (!fs.existsSync('utils')) {
      fs.mkdirSync('utils');
    }
    fs.writeFileSync('utils/cook.json', JSON.stringify(cookies, null, 2));
    console.log('Cookies stored in cook.json');
  }

  async useCookies() {
    // await this.page.context().clearCookies();
    const cookies = await this.page.context().cookies();
    await this.page.context().addCookies(cookies);
  }

  async clearCookies() {
    await this.page.context().clearCookies();
  }

  async restartbrowser() {
    await this.page.context().clearCookies();
    await this.page.context().clearPermissions();
  }

  async highlightElement(locator) {
    if (typeof locator !== 'string') {
      throw new Error(`Invalid locator type: expected string, got ${typeof locator}`);
    }
    await this.page.evaluate((locator) => {
      const element = document.evaluate(locator, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
      if (element) {
        element.style.border = '3px solid red';
      }
    }, locator);
  }

  async ClickLocator(locator) {
    await this.highlightElement(locator);
    await this.page.click(locator);
    await this.waitForTime(500);
  }

  async fill(locator, text) {
    if (typeof locator !== 'string') {
      throw new Error(`Invalid locator type: expected string, got ${typeof locator}`);
    }
    await this.page.waitForSelector(locator, { state: 'visible' });
    await this.highlightElement(locator);
    await this.page.fill(locator, text);
  }

  async waitforElementToBeVisible(locator) {
    await this.page.waitForSelector(locator, { state: 'visible' });
    await this.highlightElement(locator);
  }

  async isDashboardTabDropDownEnabled(page, DDName) {
    const selector = this.getDashboardTabDropDownXPath(DDName);
    await this.highlightElement(locator);
    return await page.isEnabled(selector);
  }

  async waitforElementToBeHidden(locator) {
    await this.page.waitForSelector(locator, { state: 'hidden' });
  }


  async waitforElementToBeEnabled(locator) {
    await this.page.waitForSelector(locator, { state: 'enabled' });
    await this.highlightElement(locator);

  }

  async waitForElementforTime(locator, milliseconds) {
    await this.page.waitForSelector(locator, { timeout: milliseconds });
    await this.highlightElement(locator);
  }

  //........Page Dynamic Locators reusables........//

  async ClickDashboardTabDD(dynamicText) {
    const dynamicXpath = `//div[contains(@class,"menu-item")]//span[contains(text(),'${dynamicText}')]`;
    this.waitForElementforTime(dynamicXpath, 5000);
    await this.page.click(dynamicXpath);
  }

  async FindDashboardTabsLinks(dynamicText) {
    const dynamicXpath = `//div[contains(@class,"menu-item")]//a[contains(text(),'${dynamicText}')]`;
    this.waitForElementforTime(dynamicXpath, 5000);
    await this.page.click(dynamicXpath);
  }
  async FillRegPageFeilds(feildname, testData) {
    const dynamicXpath = `//span[contains(text(),'${feildname}')]//ancestor::div[contains(@class, 'dx-texteditor')]//input[@class='dx-texteditor-input']`;
    this.waitForElementforTime(dynamicXpath, 5000);
    await this.page.fill(dynamicXpath, testData);
    await this.waitForTime(500);
  }

  async ContainsTextClick(dynamicText) {
    const locator = `//*[contains(text(), '${dynamicText}')]`;
    this.waitForElementforTime(locator, 5000);
    await this.page.click(locator);
    await this.waitForTime(500);

  }

  async generateAndSaveRandomEmail() {
    const randomEmail = `TestUser${Date.now()}@cybn.com`;
    testData.Email = randomEmail;
    fs.writeFileSync('testData.json', JSON.stringify(testData, null, 2));
    return randomEmail;
  }

  async generateRandomPhoneNumberof11Digits() {
    const randomPhoneNumber = Math.floor(Math.random() * 10000000000).toString().padStart(11, '0');
    testData.Phone = randomPhoneNumber;
    fs.writeFileSync('testData.json', JSON.stringify(testData, null, 2));
    return randomPhoneNumber;
  }
  async getAllElementIframeLocators() {
    const locators = await this.page.evaluate(() => {
      const elements = document.querySelectorAll('*');
      return Array.from(elements).map(el => el.tagName.toLowerCase() + (el.id ? `#${el.id}` : '') + (el.className ? `.${el.className.split(' ').join('.')}` : ''));
    });
    console.log(locators);
    return locators;
  }
}
export default CommonUtils;