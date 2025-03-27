import CommonUtils from "../utils/CommonUtils";
import testData from "../testData.json";
import { expect } from "allure-playwright";

class RegistrationPage {
  constructor(page) {
    this.page = page;
    this.registerButton = "//*[contains(text(), 'Register')]";
    this.ConditionsCheckbox = "//div[@role='checkbox']";
    this.RegisterUserButton = "//div[contains(@class,'button-content')]//span[contains(text(),'Register')]";
    this.ClearBtn = "//div[contains(@class,'button-content')]//span[contains(text(),'Clear')]";
    this.FirstName=`//span[contains(text(),'First Name')]//ancestor::div[contains(@class, 'dx-texteditor')]//input[@class='dx-texteditor-input']`;
  }
  async User_Navigates_to_Registration_Page() {
    let common;
    common = new CommonUtils(this.page);
    await common.ClickLocator(this.registerButton);
    await common.waitForTime(5000);
    const title = await this.page.title();
    expect(title).toContain("Register - CYBN");
  }

  async User_fills_Registration_form_and_clicks_Register() {

    let common;
    common = new CommonUtils(this.page);
    await common.generateAndSaveRandomEmail();
    await common.generateRandomPhoneNumberof11Digits();
    await common.FillRegPageFeilds("First Name", testData.FirstName);
    await common.FillRegPageFeilds("Last Name", testData.LastName);
    await common.FillRegPageFeilds("Email", testData.Email);
    await common.FillRegPageFeilds("Phone", testData.Phone);
    await common.FillRegPageFeilds("Password", testData.TestPW);
    await common.FillRegPageFeilds("Confirm Password", testData.TestPW);
    await common.ClickLocator(this.ConditionsCheckbox);
    await common.waitForTime(5000);
    await common.ClickLocator(this.RegisterUserButton);
  }

  async User_fills_Registration_form_and_clicks_Clear() {

    let common;
    common = new CommonUtils(this.page);
    await common.generateAndSaveRandomEmail();
    await common.generateRandomPhoneNumberof11Digits();
    await common.FillRegPageFeilds("First Name", testData.FirstName);
    await common.FillRegPageFeilds("Last Name", testData.LastName);
    await common.FillRegPageFeilds("Email", testData.Email);
    await common.FillRegPageFeilds("Phone", testData.Phone);
    await common.FillRegPageFeilds("Password", testData.TestPW);
    await common.FillRegPageFeilds("Confirm Password", testData.TestPW);
    await common.ClickLocator(this.ConditionsCheckbox);
    await common.waitForTime(5000);
    await common.ClickLocator(this.ClearBtn);
  }
  async User_verifies_form_data_is_cleared() {

    let common;
    let reg
    common = new CommonUtils(this.page);
    reg = new RegistrationPage(this.page);
    const firstNameInput = this.page.locator(this.FirstName);
    await common.highlightElement(this.FirstName);
    const value = await firstNameInput.inputValue();
    expect(value).toBe('');
    await common.ClickLocator(this.ConditionsCheckbox);
    await common.waitForTime(5000);
    await common.ClickLocator(this.ClearBtn);
  }
}
export default RegistrationPage;