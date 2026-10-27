
import { criarUsuario } from '../support/dados-usuario';

import { acessarPaginaInicial } from '../support/navegacao';

import {
  cadastrarUsuario,
  excluirConta
} from '../support/cadastro';

import {
  realizarLogin,
  realizarLogout
} from '../support/autenticacao';

import {
  adicionarProdutoAoCarrinho
} from '../support/produtos';

import {
  finalizarPedido
} from '../support/checkout';

// TC15 - Realizar pedido após cadastrar usuário
describe('TC15 - Realizar pedido após cadastrar usuário.', () => {

  it('Deve cadastrar um usuário, adicionar um produto ao carrinho e concluir o pedido', () => {

    cy.env(['SENHA_TESTE']).then(({ SENHA_TESTE }) => {
      const usuario = criarUsuario(SENHA_TESTE);

      // Acessar página inicial
      acessarPaginaInicial();

      // Cadastrar usuário antes da compra
      cadastrarUsuario(usuario);

      // Selecionar produto e adicionar ao carrinho
      adicionarProdutoAoCarrinho();

      // Finalizar pedido
      finalizarPedido();

      // Excluir conta após o pedido
      excluirConta();
    });

  });

});

// TC16 - Realizar pedido após fazer login
describe('TC16 - Realizar pedido após fazer login', () => {

  it('Deve autenticar um usuário existente, adicionar um produto ao carrinho e concluir o pedido', () => {
    cy.env(['SENHA_TESTE']).then(({ SENHA_TESTE }) => {
      const usuario = criarUsuario(SENHA_TESTE);

      // Preparar massa: cadastrar usuário
      acessarPaginaInicial();
      cadastrarUsuario(usuario);

      // Encerrar sessão após cadastro
      realizarLogout();

      // Realizar login novamente
      realizarLogin(usuario);

      // Confirmar login
      cy.contains('Logged in as')
        .should('be.visible');

      // Selecionar produto e adicionar ao carrinho
      adicionarProdutoAoCarrinho();

      // Finalizar pedido
      finalizarPedido();

      // Excluir conta após o pedido
      excluirConta();
    });

  });

});
