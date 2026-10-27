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
acessarPaginaProdutos();

// Informar o produto que será pesquisado
cy.get('#search_product')
  .should('be.visible')
  .type(produto);

// Executar a pesquisa
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
    expect(
  nomes.length,
  'A pesquisa deve retornar pelo menos um produto'
).to.be.greaterThan(0);

    // Verificar que pelo menos um produto corresponde à pesquisa
    const produtosCorrespondentes = nomes.filter((nome) =>
      nome.toLowerCase().includes(produto.toLowerCase())
    );

expect(
  produtosCorrespondentes.length,
  `A pesquisa pelo termo "${produto}" deve retornar pelo menos um produto correspondente`
).to.be.greaterThan(0);

  });

  });

});
