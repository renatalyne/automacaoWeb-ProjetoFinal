
import { criarUsuario } from '../support/dados-usuario';


import {
  acessarPaginaInicial,
  iniciarCadastro,
  preencherDadosCadastro,
  finalizarCadastro,
  realizarLogin,
  realizarLogout,
  excluirConta
} from '../support/automation-exercise';


function finalizarPedido() {

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


describe('TC15 - Realizar pedido após cadastrar usuário.', () => {
    
  it('Deve cadastrar usuário e adicionar produto ao carrinho', () => {

    const usuario = criarUsuario();

    // Acessar a página inicial
    acessarPaginaInicial();

    // Cadastrar usuário antes da compra
    iniciarCadastro(usuario);
    preencherDadosCadastro(usuario);
    finalizarCadastro(usuario);

    // Acessar a página de produtos
    cy.contains('a', 'Products')
      .should('be.visible')
      .click();

    cy.contains('h2', 'All Products')
      .should('be.visible');

    // Abrir o primeiro produto
    cy.contains('a', 'View Product')
      .first()
      .click();

    // Adicionar produto ao carrinho
    cy.get('button.cart')
      .should('be.visible')
      .click();

    // Validar confirmação
    cy.contains('Added!')
      .should('be.visible');

    // Acessar carrinho
    cy.contains('u', 'View Cart')
      .click();

    // Validar produto no carrinho
    cy.get('#cart_info_table tbody tr')
      .should('have.length.greaterThan', 0);

    // Finalizar pedido
    finalizarPedido();  
    // excluir conta após o pedido
    excluirConta();
  });

});


describe('TC16 - Realizar pedido após fazer login', () => {

  it('Deve realizar login com usuário cadastrado antes da compra', () => {

    const usuario = criarUsuario();

    // Preparar massa: cadastrar usuário
    acessarPaginaInicial();

    iniciarCadastro(usuario);
    preencherDadosCadastro(usuario);
    finalizarCadastro(usuario);

    // Encerrar sessão após o cadastro
    realizarLogout();

    // Entrar novamente com o usuário cadastrado
    realizarLogin(usuario);

    // Confirmar que o login foi realizado
    cy.contains('Logged in as')
      .should('be.visible');
      
    // Acessar a página de produtos após o login
    cy.contains('a', 'Products')
      .should('be.visible')
      .click();

    cy.contains('h2', 'All Products')
      .should('be.visible');

    // Abrir os detalhes do primeiro produto
    cy.contains('a', 'View Product')
      .first()
      .click();

    // Adicionar produto ao carrinho
    cy.get('button.cart')
      .should('be.visible')
      .click();

    // Validar confirmação da inclusão
    cy.contains('Added!')
      .should('be.visible');

    // Acessar o carrinho
    cy.contains('u', 'View Cart')
      .click();

    // Validar que existe produto no carrinho
    cy.get('#cart_info_table tbody tr')
      .should('have.length.greaterThan', 0);

    // Finalizar o pedido
    finalizarPedido();

    // Excluir a conta após a confirmação do pedido
    excluirConta();


  });

});
