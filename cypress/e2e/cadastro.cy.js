
import { criarUsuario } from '../support/dados-usuario';

import { acessarPaginaInicial } from '../support/navegacao';

import {
  cadastrarUsuario,
  excluirConta
} from '../support/cadastro';
import { realizarLogout } from '../support/autenticacao';

describe('TC01 - Cadastro de usuário', () => {

  it('Deve cadastrar um novo usuário e excluir a conta com sucesso', () => {

    cy.env(['SENHA_TESTE']).then(({ SENHA_TESTE }) => {
      const usuario = criarUsuario(SENHA_TESTE);

      acessarPaginaInicial();

      cadastrarUsuario(usuario);

      excluirConta();
    });

  });

});


describe('TC05 - Cadastro com e-mail existente', () => {
  let usuario;

  beforeEach(() => {
    cy.env(['SENHA_TESTE']).then(({ SENHA_TESTE }) => {
      usuario = criarUsuario(SENHA_TESTE);

      // Pré-condição: cadastrar um usuário existente
      acessarPaginaInicial();
      cadastrarUsuario(usuario);
      // Encerrar a sessão para iniciar o teste deslogado
      realizarLogout();
    });
  });

  it('Deve impedir cadastro com e-mail já registrado', () => {
    // Passos 1 a 3: acessar e validar a página inicial
    acessarPaginaInicial();

    // Passos 4 e 5: acessar a tela de cadastro
    cy.contains('a', 'Signup / Login')
      .should('be.visible')
      .click();

    cy.contains('h2', 'New User Signup!')
      .should('be.visible');

    // Passos 6 e 7: tentar cadastrar e-mail existente
    cy.get('[data-qa="signup-name"]')
      .type(usuario.nomeCompleto);

    cy.get('[data-qa="signup-email"]')
      .type(usuario.email);

    cy.get('[data-qa="signup-button"]')
      .click();

    // Passo 8: validar mensagem de erro
    cy.contains('Email Address already exist!')
      .should('be.visible');
  });
});
