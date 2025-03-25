const fs = require('fs');

class Common {
  constructor(page) {
    this.page = page;
  }

  async navigateTo(url) {
    await this.page.goto(url);
  }

  async waitForTime(milliseconds) {
    await this.page.waitForTimeout(milliseconds);
  }

  async takeScreenshot(testInfo) {
    let baseFileName = testInfo?.title || "Login";

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
    await this.page.context().clearCookies();
    const cookies = await this.page.context().cookies();
    await this.page.context().addCookies(cookies);

  }

  async waitforElementToBeVisible(selector) {
    await this.page.waitForSelector(selector, { state: 'visible' });
  }

  async waitforElementToBeHidden(selector) {
    await this.page.waitForSelector(selector, { state: 'hidden' });
  }

  async waitforElementToBeEnabled(selector) {
    await this.page.waitForSelector(selector, { state: 'enabled' });
  }

  async waitForElementforTime(selector, milliseconds) {
    await this.page.waitForSelector(selector, { timeout: milliseconds });
  }

}
export default Common;