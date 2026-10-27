import {
  acessarPaginaInicial
} from '../support/navegacao';

import {
  acessarPaginaProdutos
} from '../support/produtos';

describe('TC08 - Visualizar detalhes dos produtos', () => {

  it('Deve apresentar os detalhes de um produto', () => {

    acessarPaginaInicial();
    acessarPaginaProdutos();

      cy.get('.features_items .product-image-wrapper')
      .should('have.length.greaterThan', 0);

    cy.contains('a', 'View Product')
      .first()
      .click();

      cy.url().should('include', '/product_details/');
    cy.get('.product-information').within(() => {
      cy.get('h2').should('be.visible');
      cy.contains('Category:').should('be.visible');
      cy.contains('Rs.').should('be.visible');
      cy.contains('Availability:').should('be.visible');
      cy.contains('Condition:').should('be.visible');
      cy.contains('Brand:').should('be.visible');
    });

  });

});


describe('TC09 - Pesquisar produtos', () => {

  it('Deve pesquisar um produto e apresentar os resultados correspondentes', () => {

    const produto = 'Top';

    acessarPaginaInicial();
    acessarPaginaProdutos();

    // Informar o produto que será pesquisado
    cy.get('#search_product')
      .should('be.visible')
      .type(produto);

    // Executar a pesquisa
    cy.get('#submit_search')
      .click();

    // Validar a página de resultados
    cy.contains('h2', 'Searched Products')
      .should('be.visible');

    // Validar os produtos retornados
    cy.get('.features_items .product-image-wrapper')
      .should('have.length.greaterThan', 0)
      .each(($produto) => {
        cy.wrap($produto)
          .should('be.visible');

        cy.wrap($produto)
          .find('.productinfo p')
          .should('exist')
          .invoke('text')
          .should('not.be.empty');
      });

  });

});
