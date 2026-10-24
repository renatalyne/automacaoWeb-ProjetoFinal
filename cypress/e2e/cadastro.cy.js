
import { criarUsuario } from '../support/dados-usuario';

import {
  acessarPaginaInicial,
  iniciarCadastro,
  preencherDadosCadastro,
  finalizarCadastro,
  excluirConta
} from '../support/automation-exercise';

describe('TC01 - Cadastro de usuário', () => {

  it('Deve cadastrar e excluir um usuário com sucesso', () => {

    const usuario = criarUsuario();

    acessarPaginaInicial();

    iniciarCadastro(usuario);

    preencherDadosCadastro(usuario);

    finalizarCadastro(usuario);

    excluirConta();

  });

describe('TC05 - Cadastro com e-mail existente', () => {

  it('Deve impedir cadastro com e-mail já registrado', () => {

    const usuario = criarUsuario();

    // Preparação: cadastrar o usuário
    acessarPaginaInicial();
    iniciarCadastro(usuario);
    preencherDadosCadastro(usuario);
    finalizarCadastro(usuario);

    // Encerrar a sessão
    cy.contains('a', 'Logout')
      .should('be.visible')
      .click();

    // Tentar cadastrar novamente com o mesmo e-mail
    cy.contains('h2', 'New User Signup!')
      .should('be.visible');

    cy.get('[data-qa="signup-name"]')
      .type(usuario.nomeCompleto);

    cy.get('[data-qa="signup-email"]')
      .type(usuario.email);

    cy.get('[data-qa="signup-button"]')
      .click();

    // Validar mensagem de e-mail já cadastrado
    cy.contains('Email Address already exist!')
      .should('be.visible');

  });

});

});
