import CommonUtils from "../utils/CommonUtils";
import testData from '../testData.json';

class LoginPage {

  constructor(page) {
    this.page = page;
    this.EmailInput = "//input[@type='email']";
    this.PWInput = "//input[@type='password']";
    this.login = "//div[contains(@class,'button-content') and contains(text(),'Log In')]";
    this.registerButton = "//*[contains(text(), 'Register')]";
    this.LoginButton = "//*[contains(text(), 'Login')]";
  }

  async logintoCYBN(username, password) {
    let common;
    common = new CommonUtils(this.page);
    await common.navigateTo(testData.loginUrl);
    await common.fill(this.EmailInput, username);
    await common.fill(this.PWInput, password);
    await common.ClickLocator(this.login);
    await common.takeScreenshot('login');
    await common.waitForTime(10000);
    await common.waitforElementToBeHidden(this.LoginButton);
  }


  async Logout() {
    let common;
    common = new CommonUtils(this.page);
    await common.ClickDashboardTabDD('Hi Tester');
    await common.waitForTime(500);
    await common.ContainsTextClick('Logout');
    await common.takeScreenshot();
  }
}
export default LoginPage;