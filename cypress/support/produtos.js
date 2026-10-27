
const seletores = {
  botaoAdicionarCarrinho: 'button.cart',
  produtosNoCarrinho: '#cart_info_table tbody tr'
};

export function acessarPaginaProdutos() {
  cy.contains('a', 'Products')
    .should('be.visible')
    .click();

  cy.contains('h2', 'All Products')
    .should('be.visible');
}

export function adicionarProdutoAoCarrinho() {
  // Acessar a página de produtos
  acessarPaginaProdutos();

  // Abrir o primeiro produto
  cy.contains('a', 'View Product')
    .first()
    .click();

  // Adicionar produto ao carrinho
  cy.get(seletores.botaoAdicionarCarrinho)
    .should('be.visible')
    .click();

  // Validar confirmação
  cy.contains('Added!')
    .should('be.visible');

  // Acessar o carrinho
  cy.contains('u', 'View Cart')
    .click();

  // Validar produto no carrinho
  cy.get(seletores.produtosNoCarrinho)
    .should('have.length.greaterThan', 0);
}
