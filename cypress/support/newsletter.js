export function assinarNewsletter(email) {

  // Localizar a seção de assinatura
  cy.get('#footer')
    .scrollIntoView();

  // Validar o título
  cy.contains('h2', 'Subscription')
    .should('be.visible');

  // Preencher o e-mail
  cy.get('#susbscribe_email')
    .should('be.visible')
    .type(email);

  // Confirmar assinatura
  cy.get('#subscribe')
    .click();

  // Validar mensagem de sucesso
  cy.contains('You have been successfully subscribed!')
    .should('be.visible');
}