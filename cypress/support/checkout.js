
const seletores = {
  enderecoEntrega: '#address_delivery',
  enderecoCobranca: '#address_invoice',
  resumoPedido: '#cart_info',
  comentario: 'textarea[name="message"]',

  nomeCartao: '[data-qa="name-on-card"]',
  numeroCartao: '[data-qa="card-number"]',
  codigoSeguranca: '[data-qa="cvc"]',
  mesValidade: '[data-qa="expiry-month"]',
  anoValidade: '[data-qa="expiry-year"]',
  botaoPagamento: '[data-qa="pay-button"]'
};

function iniciarCheckout() {
  cy.contains('a', 'Proceed To Checkout')
    .should('be.visible')
    .click();

  cy.url().should('include', '/checkout');
}

function validarDadosCheckout() {
  cy.contains('h2', 'Address Details')
    .should('be.visible');

  cy.get(seletores.enderecoEntrega)
    .should('be.visible');

  cy.get(seletores.enderecoCobranca)
    .should('be.visible');

  cy.contains('h2', 'Review Your Order')
    .should('be.visible');

  cy.get(seletores.resumoPedido)
    .should('be.visible');
}

function confirmarPedido() {
  cy.get(seletores.comentario)
    .type('Pedido realizado por teste automatizado com Cypress.');

  cy.contains('a', 'Place Order')
    .should('be.visible')
    .click();

  cy.url().should('include', '/payment');

  cy.get(seletores.nomeCartao)
    .should('be.visible');
}


function preencherDadosPagamento() {
  cy.get(seletores.nomeCartao)
    .type('Usuario Teste');

  cy.get(seletores.numeroCartao)
    .type('4111111111111111', { log: false });

  cy.get(seletores.codigoSeguranca)
    .type('123', { log: false });

  cy.get(seletores.mesValidade)
    .type('12');

  cy.get(seletores.anoValidade)
    .type('2030');
}

function confirmarPagamento() {
  cy.get(seletores.botaoPagamento)
    .should('be.visible')
    .click();

  cy.contains('Congratulations! Your order has been confirmed!')
    .should('be.visible');
}

export function finalizarPedido() {
  iniciarCheckout();
  validarDadosCheckout();
  confirmarPedido();
  preencherDadosPagamento();
  confirmarPagamento();
}
