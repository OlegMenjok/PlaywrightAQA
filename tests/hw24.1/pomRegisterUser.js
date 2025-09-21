export class RegisterPage {
  constructor(page) {
    this.page = page;
    this.signupName = page.locator('#signupName');
    this.signupLastName = page.locator('#signupLastName');
    this.signupEmail = page.getByRole('textbox', {
      name: 'Name Last name Email',
    });
    this.signInEmail = page.getByRole('textbox', {
      name: 'Email',
    });
    this.password = page.getByRole('textbox', {
      name: 'Password',
      exact: true,
    });
    this.reenterPassword = page.getByRole('textbox', {
      name: 'Re-enter password',
    });
    this.registerButton = page.getByRole('button', { name: 'Register' });
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.registrationMessage = page
      .locator('div')
      .filter({ hasText: 'Registration complete' })
      .nth(3);
    this.registrationCloseButton = page.getByText('Registration×');
  }

  async navigate() {
    await this.page.goto('/');
    await this.page.getByRole('button', { name: 'Sign up' }).click();
  }

    async login() {
    await this.page.goto('/');
    await this.page.getByRole('button', { name: 'Sign in' }).click();
  }

  async fillName(name) {
    await this.signupName.fill(name);
  }

  async fillLastName(lastName) {
    await this.signupLastName.fill(lastName);
  }

  async fillEmail(email) {
    await this.signupEmail.fill(email);
  }

    async fillSignInEmail(email) {
    await this.signInEmail.fill(email);
  }

  async fillPassword(pass) {
    await this.password.fill(pass);
  }

  async fillReenterPassword(pass) {
    await this.reenterPassword.fill(pass);
  }

  async submit() {
    await this.registerButton.click();
  }

    async loginSubmitButton() {
    await this.loginButton.click();
  }

  async getRegistrationMessage() {
    return this.registrationMessage;
  }

  async closeRegistrationPopup() {
    await this.registrationCloseButton.click();
  }
}
