export function realizarLogin(usuario) {
  cy.contains('a', 'Signup / Login')
    .should('be.visible')
    .click();

  cy.contains('h2', 'Login to your account')
    .should('be.visible');

  cy.get('[data-qa="login-email"]')
    .type(usuario.email);

  cy.get('[data-qa="login-password"]')
    .type(usuario.senha, { log: false });

  cy.get('[data-qa="login-button"]')
    .click();

  cy.contains('a', `Logged in as ${usuario.nomeCompleto}`)
    .should('be.visible');
}

export function realizarLogout() {
  cy.contains('a', 'Logout')
    .should('be.visible')
    .click();

  cy.url().should('include', '/login');
}
export function realizarLoginInvalido(email, senha) {
  cy.contains('a', 'Signup / Login')
    .should('be.visible')
    .click();

  cy.contains('h2', 'Login to your account')
    .should('be.visible');

  cy.get('[data-qa="login-email"]')
    .type(email);

  cy.get('[data-qa="login-password"]')
    .type(senha, { log: false });

  cy.get('[data-qa="login-button"]')
    .click();

  cy.contains('Your email or password is incorrect!')
    .should('be.visible');
}