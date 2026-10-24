
import {
  acessarPaginaInicial
} from '../support/automation-exercise';

describe('TC08 - Visualizar detalhes dos produtos', () => {

  it('Deve apresentar os detalhes de um produto', () => {

    acessarPaginaInicial();

    cy.contains('a', 'Products')
      .should('be.visible')
      .click();

    cy.contains('h2', 'All Products')
      .should('be.visible');

    cy.get('.features_items .product-image-wrapper')
      .should('have.length.greaterThan', 0);

    cy.contains('a', 'View Product')
      .first()
      .click();

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

  it('Deve pesquisar produtos e apresentar os resultados', () => {

    const produto = 'Top';

    acessarPaginaInicial();

    cy.contains('a', 'Products')
      .should('be.visible')
      .click();

    cy.contains('h2', 'All Products')
      .should('be.visible');

    cy.get('#search_product')
      .should('be.visible')
      .type(produto);

    cy.get('#submit_search').click();

    cy.contains('h2', 'Searched Products')
      .should('be.visible');

    cy.get('.features_items .product-image-wrapper')
      .should('have.length.greaterThan', 0);





cy.get('.features_items .productinfo p')
  .then(($produtos) => {

    const nomes = $produtos.toArray().map((elemento) =>
      elemento.innerText.trim()
    );

    // Verificar que existem produtos encontrados
    expect(nomes.length).to.be.greaterThan(0);

    // Verificar que pelo menos um produto corresponde à pesquisa
    const produtosCorrespondentes = nomes.filter((nome) =>
      nome.toLowerCase().includes(produto.toLowerCase())
    );

    expect(produtosCorrespondentes.length)
      .to.be.greaterThan(0);

  });

  });

});
