
const seletores = {
  email: '[data-qa="login-email"]',
  senha: '[data-qa="login-password"]',
  botaoLogin: '[data-qa="login-button"]'
};

function preencherFormularioLogin(email, senha) {
  cy.contains('a', 'Signup / Login')
    .should('be.visible')
    .click();

  cy.contains('h2', 'Login to your account')
    .should('be.visible');

  cy.get(seletores.email)
    .type(email);

  cy.get(seletores.senha)
    .type(senha, { log: false });

  cy.get(seletores.botaoLogin)
    .click();
}

export function realizarLogin(usuario) {
  preencherFormularioLogin(usuario.email, usuario.senha);

  cy.contains('a', `Logged in as ${usuario.nomeCompleto}`)
    .should('be.visible');
}

export function realizarLoginInvalido(email, senha) {
  preencherFormularioLogin(email, senha);

  cy.contains('Your email or password is incorrect!')
    .should('be.visible');
}

export function realizarLogout() {
  cy.contains('a', 'Logout')
    .should('be.visible')
    .click();

  cy.url().should('include', '/login');
}
