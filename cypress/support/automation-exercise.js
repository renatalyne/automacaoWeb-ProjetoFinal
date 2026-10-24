
export function acessarPaginaInicial() {
  cy.visit('https://automationexercise.com');
}

export function iniciarCadastro(usuario) {
  cy.contains('a', 'Signup / Login')
    .should('be.visible')
    .click();

  cy.contains('h2', 'New User Signup!')
    .should('be.visible');

  cy.get('[data-qa="signup-name"]')
    .type(usuario.nomeCompleto);

  cy.get('[data-qa="signup-email"]')
    .type(usuario.email);

  cy.get('[data-qa="signup-button"]')
    .click();

  cy.contains('b', 'Enter Account Information')
    .should('be.visible');
}

export function preencherDadosCadastro(usuario) {
  cy.get('#id_gender2').check();

  cy.get('[data-qa="password"]')
    .type(usuario.senha, { log: false });

  cy.get('[data-qa="days"]').select('15');
  cy.get('[data-qa="months"]').select('May');
  cy.get('[data-qa="years"]').select('1995');

  cy.get('#newsletter').check();
  cy.get('#optin').check();

  cy.get('[data-qa="first_name"]').type(usuario.nome);
  cy.get('[data-qa="last_name"]').type(usuario.sobrenome);

  cy.get('[data-qa="company"]').type(usuario.empresa);
  cy.get('[data-qa="address"]').type(usuario.endereco);
  cy.get('[data-qa="address2"]').type(usuario.complemento);

  cy.get('[data-qa="country"]').select(usuario.pais);
  cy.get('[data-qa="state"]').type(usuario.estado);
  cy.get('[data-qa="city"]').type(usuario.cidade);
  cy.get('[data-qa="zipcode"]').type(usuario.cep);
  cy.get('[data-qa="mobile_number"]').type(usuario.telefone);
}

export function finalizarCadastro(usuario) {
  cy.get('[data-qa="create-account"]').click();

  cy.contains('b', 'Account Created!')
    .should('be.visible');

  cy.get('[data-qa="continue-button"]').click();

  cy.contains('a', `Logged in as ${usuario.nomeCompleto}`)
    .should('be.visible');
}

export function excluirConta() {
  cy.contains('a', 'Delete Account').click();

  cy.contains('b', 'Account Deleted!')
    .should('be.visible');

  cy.get('[data-qa="continue-button"]').click();
}

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
