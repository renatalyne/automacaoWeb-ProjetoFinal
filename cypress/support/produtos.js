export function adicionarProdutoAoCarrinho() {
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

  // Acessar o carrinho
  cy.contains('u', 'View Cart')
    .click();

  // Validar produto no carrinho
  cy.get('#cart_info_table tbody tr')
    .should('have.length.greaterThan', 0);
}
export function acessarPaginaProdutos() {
  cy.contains('a', 'Products')
    .should('be.visible')
    .click();

  cy.contains('h2', 'All Products')
    .should('be.visible');
}