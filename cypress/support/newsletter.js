
const seletores = {
  rodape: '#footer',
  campoEmail: '#susbscribe_email',
  botaoAssinar: '#subscribe'
};

export function assinarNewsletter(email) {
  // Localizar a seção de assinatura
  cy.get(seletores.rodape)
    .scrollIntoView();

  // Validar o título
  cy.contains('h2', 'Subscription')
    .should('be.visible');

  // Preencher o e-mail
  cy.get(seletores.campoEmail)
    .should('be.visible')
    .type(email);

  // Confirmar assinatura
  cy.get(seletores.botaoAssinar)
    .click();

  // Validar mensagem de sucesso
  cy.contains('You have been successfully subscribed!')
    .should('be.visible');
}
