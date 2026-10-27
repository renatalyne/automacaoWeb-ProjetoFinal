export function finalizarPedido() {

  // Iniciar checkout
  cy.contains('a', 'Proceed To Checkout')
    .should('be.visible')
    .click();

  // Validar página de checkout
  cy.url().should('include', '/checkout');

  cy.contains('h2', 'Address Details')
    .should('be.visible');

  cy.get('#address_delivery')
    .should('be.visible');

  cy.get('#address_invoice')
    .should('be.visible');

  cy.contains('h2', 'Review Your Order')
    .should('be.visible');

  cy.get('#cart_info')
    .should('be.visible');

  // Adicionar comentário
  cy.get('textarea[name="message"]')
    .type('Pedido realizado por teste automatizado com Cypress.');

  // Confirmar pedido
  cy.contains('a', 'Place Order')
    .should('be.visible')
    .click();

  // Validar página de pagamento
  cy.url().should('include', '/payment');

  cy.contains('h2', 'Payment')
    .should('be.visible');

  // Preencher dados fictícios de pagamento
  cy.get('[data-qa="name-on-card"]')
    .type('Usuario Teste');

  cy.get('[data-qa="card-number"]')
    .type('4111111111111111');

  cy.get('[data-qa="cvc"]')
    .type('123');

  cy.get('[data-qa="expiry-month"]')
    .type('12');

  cy.get('[data-qa="expiry-year"]')
    .type('2030');

  // Confirmar pagamento
  cy.get('[data-qa="pay-button"]')
    .should('be.visible')
    .click();

  // Validar pedido confirmado
  cy.contains('Congratulations! Your order has been confirmed!')
    .should('be.visible');
}

