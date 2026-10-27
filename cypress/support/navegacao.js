
export function acessarPaginaInicial() {
  cy.visit('/');

  cy.get('body')
    .should('be.visible');

  cy.contains('a', 'Signup / Login')
    .should('be.visible');
}