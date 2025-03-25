class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = page.getByRole('textbox', { name: 'Email *' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password *' });
    this.loginButton = page.getByRole('button', { name: 'Log In' });
  }

  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
export default LoginPage;